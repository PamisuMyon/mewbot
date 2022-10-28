import WebSocket from 'ws';
import { logger, LogLevel } from "../commons/logger.js";
import unescape from "../commons/unescape.js";
import { BaseEmitter } from "../commons/base-emitter.js";
import { Auth, ConnectOptions, ConnectStatus, Dispatch, DispatchEvent, Message, refineMessage } from './model/index.js';

export class WsHandler extends BaseEmitter<{
    open: void,
    dispatch: Dispatch,
    close: void,
}> {

    protected _ws!: WebSocket;
    protected _connectStatus = ConnectStatus.None;
    protected _heartbeatCheck = -1;

    connect(options: ConnectOptions, auth?: Auth) {
        if (this._connectStatus == ConnectStatus.Connected) {
            logger.info('Websocket already connected.');
            return;
        }
        if (this._connectStatus == ConnectStatus.Connecting) {
            logger.info('Websocket is connecting.');
            return;
        }

        // const opt = initConnectOptions(options);  already initialized outside
        const opt = options;
        this._connectStatus = ConnectStatus.Connecting;
        if (this._ws != null) {
            this._ws.removeAllListeners();
        }
        const wsOptions: any = {
            headers: options.serverInfo!.getWsHeaders(),
            handshakeTimeout: opt.handshakeTimeout,
        };
        if (opt.agent) {
            wsOptions.agent = opt.agent;
        }
        
        this._ws = new WebSocket(opt.serverInfo!.wsHost, wsOptions);
        
        this._ws.on('open', () => {
            logger.debug('Websocket connection open.');
            this._connectStatus = ConnectStatus.Connected;
            this.checkHeartbeat(opt, opt.heartbeatCheckTimeout * 2);
            this.emit('open', undefined);
        });
    
        this._ws.on('message', (data: string) => {
            // 初始化数据，身份认证
            const initRegex = /(\d+){.*/;
            let r = initRegex.exec(data);
            if (r) {
                logger.debug('Receive message: ' + data);
                const code = eval(r[1]);
                if (code == 0) {
                    // 建立连接后第一条消息0，回复40
                    logger.debug('Sending 40');
                    this._ws.send(40);
                } else if (code == 40) {
                    // 回复40后接收到40，发送身份验证 420 identity
                    const token: any = {
                        platform: 'web',
                        active: true
                    };
                    if (auth && auth.token)
                        token.token = auth.token;
                    const identify = `420["identity",${JSON.stringify(JSON.stringify(token))}]`;
                    logger.debug('Sending identity: ' + identify);
                    this._ws.send(identify);
    
                    // 发送421 active
                    const active = '421["active","{\\"active\\":true,\\"isWeb\\":true}"]';
                    logger.debug('Sending active: ' + active);
                    this._ws.send(active);
                }
                return;
            }
    
            // 订阅与消息数据
            const dataRegex = /(\d+)\["([^"]+)","(.+)"\]/;
            r = dataRegex.exec(data);
            if (r) {
                const code = eval(r[1]);
                if (code == 42) {
                    if (r[2] == 'identity') {
                        logger.debug('Receive identity: ' + data);
                        // 接收到identity，身份认证成功，发送第一次据点消息订阅（空） 422 subscription
                        const messageSubscriptionValue = {
                            node: {
                                op: 'set',
                                items: [],
                            }
                        };
                        const messageSubscription = `422["subscription",${JSON.stringify(JSON.stringify(messageSubscriptionValue))}]`;
                        logger.debug('Sending empty node subscription: ' + messageSubscription);
                        this._ws.send(messageSubscription);
                        return;
                    } else if (r[2] == 'subscription') {
                        logger.debug('Receive subcription: ' + data);
                        // 接收到订阅结果，判断为第几次订阅
                        r[3] = r[3].trim().replace(/\\"/g, "\"");
                        const content = JSON.parse(r[3]);
                        if (content.node.length == 0) {
                            // 为第一次订阅回复，发送第二次据点消息订阅 423 subscription
                            const messageSubscriptionValue = {
                                node: {
                                    op: 'set',
                                    items: opt.subcriptionNodes,
                                }
                            };
                            const messageSubscription = `423["subscription",${JSON.stringify(JSON.stringify(messageSubscriptionValue))}]`;
                            logger.log('Sending node subscription: ' + messageSubscription);
                            this._ws.send(messageSubscription);
                        }
                        return;
                    } else if (r[2] == "dispatch") {
                        // 消息
                        const dispatch = this.parseDispatch(r[3]);
                        this.refineDispatch(dispatch);
                        // logger.dir(dispatch, LogLevel.Debug);
                        this.emit('dispatch', dispatch);
                        return;
                    }
                }
            }
    
            // 心跳
            if (eval(data) == 2) {
                logger.debug('Receive ❤ : ' + data);
                this._ws.send(3);
                this.checkHeartbeat(opt);
                logger.debug('Send ❤ : ' + 3);
                return;
            }

            logger.verbose('Receive message: ' + data);
        });
    
        this._ws.on('error', (err: Error) => {
            this._connectStatus = ConnectStatus.None;
            logger.error('Websocket error: ');
            logger.dir(err, LogLevel.Error);
        });
    
        this._ws.on('close', () => {
            logger.debug('Websocket close');
            this.emit('close', undefined);
            if (this._connectStatus != ConnectStatus.None) {
                this._connectStatus = ConnectStatus.None;
                this.retryConnection(opt);
            }
        });
    }
    
    protected retryConnection(options: ConnectOptions) {
        if (this._connectStatus == ConnectStatus.Connecting) {
            return;
        }
        logger.debug('Websocket disconnected, trying reconnection...');
        if (this._heartbeatCheck != -1) {
            clearTimeout(this._heartbeatCheck);
            this._heartbeatCheck = -1;
        }
        setTimeout(() => {
            try {
                this.connect(options);
            } catch (err) {
                this._connectStatus = ConnectStatus.None;
                logger.error(err);
                logger.error('Reconnection error, trying reconnection...');
                this.retryConnection(options);
            }
        }, options.reconnectTimeout);
    }
    
    protected checkHeartbeat(options: ConnectOptions, timeout = 0) {
        timeout = timeout || options.heartbeatCheckTimeout;
        if (this._heartbeatCheck != -1) {
            clearTimeout(this._heartbeatCheck);
            this._heartbeatCheck = -1;
        }
        this._heartbeatCheck = setTimeout(() => {
            logger.error('Heartbeat timeout, trying reconnection...');
            this.retryConnection(options);
        }, timeout) as unknown as number;
    }
    
    protected parseDispatch(raw: string): Dispatch {
        let result!: Dispatch;
        let temp: string;
        try {
            temp = unescape(raw);
            result = JSON.parse(temp) as Dispatch;
        } catch (err) {
            logger.debug("Dispatch content parse error, retry with char replacing...");
            try {
                raw = raw.trim()
                    .replace(/\\"/g, "\"")
                    .replace(/\\\\"/g, '')
                    .replace(/\\\\n/g, '');
                result = JSON.parse(raw) as Dispatch;
            } catch (err) {
                logger.error("Dispatch content parse failed.");
            }
        }
        return result;
    }
    
    protected refineDispatch(raw: Dispatch) {
        if (!raw.data)
            return;
        if (raw.event == DispatchEvent.MessageCreate) {
            refineMessage(raw.data as Message);
        }
    }
    
    close() {
        if (this._connectStatus != ConnectStatus.Connected)
            return;
        this._connectStatus = ConnectStatus.None;
        this._ws.close();
    }
}
