import got from "got";
import { logger, LogLevel } from "../commons/logger.js";
import { ApiHost, getHeaders } from "./constants.js";
import { BaseEmitter } from "../commons/base-emitter.js";
import { Util } from "../commons/utils.js";
import { WsHandler } from "./ws-handler.js";
import { imagex } from "@volcengine/openapi";
import { Auth, AuthMode, CommentEngagementData, ConnectOptions, Dispatch, DispatchEvent, Message, MediaImageInfo, MessageCreateData, MessageDeleteData, MessageEngagementData, Node, NodeMemberAddData, OutgoingMessage, Result, Stamps, STSToken, ThoughtEngagementData, Topic, TopicMessageResult, User, UserTypingData, Thoughts, OutgoingThought, Thought, Embed, Comments, Comment, OutgoingComment } from "./model/index.js";

export class MewClient extends BaseEmitter<{
    open: void;
    close: void;
    dispatch: Dispatch,
    user_typing: UserTypingData,
    message_create: MessageCreateData,
    message_delete: MessageDeleteData,
    message_engagement: MessageEngagementData,
    thought_engagement: ThoughtEngagementData,
    comment_engagement: CommentEngagementData,
    node_member_add: NodeMemberAddData,
}> {
    protected _ws!: WsHandler;
    protected _auth!: Auth;
    /**
     * 当前授权token信息
     * @category 授权
     */
    get auth() {
        return this._auth;
    }

    /**
     * 是否有授权token
     * @category 授权
     */
    get hasAuth() {
        if (this._auth && this._auth.token)
            return true;
        return false;
    }

    constructor() {
        super();
        this.initWs();
    }

    // #region Websocket API

    protected initWs() {
        this._ws = new WsHandler();
        this._ws.on('open', () => this.emit('open', undefined));
        this._ws.on('close', () => this.emit('close', undefined));
        this._ws.on('dispatch', dispatch => this.onDispatch(dispatch));
    }

    protected onDispatch(dispatch: Dispatch) {
        this.emit('dispatch', dispatch);
        switch (dispatch.event) {
        case DispatchEvent.UserTyping:
            this.emit('user_typing', dispatch.data as UserTypingData);
            break;
        case DispatchEvent.MessageCreate:
            this.emit('message_create', dispatch.data as MessageCreateData);
            break;
        case DispatchEvent.MessageDelete:
            this.emit('message_delete', dispatch.data as MessageDeleteData);
            break;
        case DispatchEvent.MessageEngagement:
            this.emit('message_engagement', dispatch.data as MessageEngagementData);
            break;
        case DispatchEvent.ThoughtEngagement:
            this.emit('thought_engagement', dispatch.data as ThoughtEngagementData);
            break;
        case DispatchEvent.CommentEngagement:
            this.emit('comment_engagement', dispatch.data as CommentEngagementData);
            break;
        case DispatchEvent.NodeMemberAdd:
            this.emit('node_member_add', dispatch.data as NodeMemberAddData);
            break;
        }
    }

    /**
     * 开启连接
     * @category 连接
     * @param options 连接选项 
     */
    connect(options: Partial<ConnectOptions>) {
        this._ws.connect(options);
    }

    /**
     * 关闭连接
     * @category 连接
     */
    close() {
        this._ws.close();
    }

    // #endregion Websocket API

    // #region HTTP API

    /**
     * 通用的json请求方法
     * @category 通用
     * @param url url 
     * @param options 请求配置，参考[got Options](https://github.com/sindresorhus/got/blob/main/documentation/2-options.md)
     * @param authMode 授权模式，参考{@link AuthMode}
     * @returns 请求结果， 参考{@link Result}
     */
    async request<T>(url: string, options?: any, authMode = AuthMode.NeedAuth): Promise<Result<T>> {
        const optDefaults = {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            responseType: 'json',
        };
        options = {
            ...optDefaults,
            ...options
        };
        options.headers = {
            ...options.headers,
            ...getHeaders(),
        };
        if (authMode == AuthMode.NeedAuth) {
            if (!this.hasAuth) {
                logger.error('No token specified, use setToken or login method to initialize token.');
                return { error: { name: 'NoTokenError' } };
            }
            options.headers['Authorization'] = `Bearer ${this._auth.token}`;
        } else if (authMode == AuthMode.Free && this.hasAuth) {
            options.headers['Authorization'] = `Bearer ${this._auth.token}`;
        }
        logger.verbose('Request options:');
        logger.dir(options, LogLevel.Verbose);
        try {
            logger.debug(`${options.method} ${url}`);
            const { body } = await got<T>(url, options);
            logger.debug(`${options.method} Responsed ${url}`);
            return { data: body };
        } catch (err: any) {
            logger.error('Request error.');
            if (err && err.response && err.response.body) {
                logger.dir(err.response.body, LogLevel.Error);
                err.response.body._isError = true;
                return { error: err.response.body };
            }
        }
        return { error: { name: 'UnknownClientError' } };
    }

    /**
     * 设置授权Token
     * 
     * 官方暂未提供token获取方式，请使用抓包工具自行抓取
     * @category 授权
     * @param token 授权token
     */
    setToken(token: string) {
        if (this._auth) {
            this._auth.token = token;
        } else {
            this._auth = { token };
        }
    }

    /**
     * 账密登录
     * @category 授权
     * @deprecated 官方已不再使用v1登录API，无法确保其可用性，请使用{@link setToken}替代
     * @param username 账户
     * @param password 密码
     */
    async login(username: string, password: string) {
        const url = ApiHost + '/api/v1/auth/login';
        const options: any = {
            method: 'POST',
            json: {
                username, password
            },
        };
        const result = await this.request<Auth>(url, options, AuthMode.NoAuth);
        if (result.data?.token) {
            this._auth = result.data;
        }
        return result;
    }

    /**
     * 发送消息
     * @category 消息
     * @param topic_id 话题/节点id
     * @param message 消息 参考{@link OutgoingMessage}
     */
    async sendMessage(topic_id: string, message: OutgoingMessage) {
        const url = ApiHost + `/api/v1/topics/${topic_id}/messages`;
        message.nonce = Util.nonce();
        const options: any = {
            method: 'POST',
            json: message,
        };
        const result = await this.request<Message>(url, options);
        return result;
    }

    /**
     * 发送文本消息
     * @category 消息
     * @param topic_id 话题/节点id
     * @param content 文本内容
     */
    async sendTextMessage(topic_id: string, content: string) {
        return await this.sendMessage(topic_id, { content });
    }

    /**
     * 发送表情消息
     * @category 消息
     * @param topic_id 话题/节点id
     * @param stamp_id 表情id 参考{@link getStamps}
     */
    async sendStampMessage(topic_id: string, stamp_id: string) {
        return await this.sendMessage(topic_id, { stamp: stamp_id });
    }

    /**
     * 发送想法消息（转发想法到节点）
     * @category 消息
     * @param topic_id 话题/节点id
     * @param though_id 想法id
     */
    async sendThoughtMessage(topic_id: string, though_id: string) {
        return await this.sendMessage(topic_id, {
            type: 2,
            thought: though_id,
        });
    }

    /**
     * 发送图片消息
     * @category 消息
     * @param topic_id 话题/节点id
     * @param filePath 文件路径
     */
    async sendImageMessage(topic_id: string, filePath: string) {
        const info = await this.uploadImage(filePath);
        if (info.data) {
            return await this.sendMessage(topic_id, {
                media: [info.data.id]
            });
        }
        return { error: info.error };
    }

    // #region Image upload

    /**
     * 上传图片
     * 
     * 参考 [veImageX 图片上传](https://www.volcengine.com/docs/508/67331)
     * @category 媒体
     * @param filePath 文件路径
     * @param retry 上传重试次数，默认 2
     * @param retryInterval 重试间隔，默认200
     * @returns 图片信息
     */
    async uploadImage(filePath: string, retry = 2, retryInterval = 200) {
        // 获取sts token
        const token = await this.stsToken();
        if (token.data) {
            // 上传图片
            let upload: any;
            do {
                upload = await this.imagexUpload(token.data, filePath);
                if (!upload) {
                    logger.debug("Imagex upload failed, retry times: " + retry);
                    retry--;
                    await Util.sleep(retryInterval);
                }
            } while (!upload && retry > 0);
            if (upload) {
                // 获取图片信息
                return await this.getImageInfo(upload.ImageUri);
            }
        }
        return { error: { name: 'ImagexUploadFailedError' } };
    }

    /**
     * 获取veImagex上传所需STSToken
     * 
     * 通常不需要直接调用此方法，请使用 {@link uploadImage}
     * @category 媒体
     */
    async stsToken() {
        const url = ApiHost + '/api/v1/medias/image/STSToken';
        return await this.request<STSToken>(url);
    }

    /**
     * veImagex上传
     * 
     * 通常不需要直接调用此方法，请使用 {@link uploadImage}
     * @category 媒体
     * @param token STSToken
     * @param filePath 文件路径
     */
    async imagexUpload(token: STSToken, filePath: string): Promise<any | undefined> {
        const imagexService = imagex.defaultService;
        imagexService.setAccessKeyId(token.access_key_id);
        imagexService.setSecretKey(token.secret_access_key);
        imagexService.setSessionToken(token.session_token);

        const options = {
            serviceId: 'c226mjqywu',    // hard-code
            files: [filePath]
        };
        try {
            logger.debug('Imagex uploading...');
            const res = await imagexService.UploadImages(options);
            if (res.Result && res.Result.PluginResult && res.Result.PluginResult.length > 0) {
                const result = res.Result.PluginResult[0];
                logger.debug('Imagex uploaded: ' + result.ImageUri);
                return result;
            } else {
                logger.debug('Imagex upload error result: ');
                logger.dir(res);
            }
        } catch (err) {
            logger.error('Imagex upload failed.');
            logger.dir(err, LogLevel.Error);
        }
        return;
    }

    /**
     * 获取图片信息
     * @category 媒体
     * @param imageUri 图片uri
     */
    async getImageInfo(imageUri: string) {
        const url = ApiHost + '/api/v1/medias/image/' + imageUri.replace('/', '%2F');
        return await this.request<MediaImageInfo>(url, { method: 'POST' });
    }

    // #endregion Image upload


    /**
     * 获取某个节点的消息
     * @category 消息
     * @param topic_id 话题/节点id
     * @param limit 数量，默认50
     * @param before 消息id，获取该条消息之前的消息
     * @param after 消息id，获取该条消息之后的消息
     */
    async getTopicMessages(topic_id: string, limit = 50, before?: string, after?: string) {
        let url = ApiHost + `/api/v1/topics/${topic_id}/messages?limit=${limit}`;
        if (before)
            url += `&before=${before}`;
        if (after)
            url += `&after=${after}`;
        const result = await this.request<TopicMessageResult>(url, null, AuthMode.Free);
        return result;
    }

    /**
     * 标记该条消息之前的消息为已读
     * 
     * 如果在节点、私聊中发送了消息，服务端会自动将该条消息之前的所有消息标记为已读，不需要手动调用本方法
     * @category 消息
     * @param topic_id 话题/节点id
     * @param message_id 消息id
     * @returns 返回data为空字符串代表成功
     */
    async readMessage(topic_id: string, message_id: string) {
        const url = ApiHost + `/api/v1/topics/${topic_id}/messages/${message_id}/ack`;
        return await this.request<string>(url, { method: 'PATCH', responseType: 'text' });
    }

    /**
     * 撤回/删除消息
     * @category 消息
     * @param message_id 消息id 
     * @returns 返回data为空字符串代表成功
     */
    async deleteMessage(message_id: string) {
        const url = ApiHost + `/api/v1/messages/${message_id}`;
        return await this.request<string>(url, { method: 'DELETE', responseType: 'text' });
    }

    /**
     * 给消息添加情绪（表情）
     * @category 消息
     * @param message_id 消息id
     * @param stamp_id 表情id
     */
    async addMessageReaction(message_id: string, stamp_id: string) {
        const url = ApiHost + `/api/v1/messages/${message_id}/reaction/${stamp_id}`;
        return await this.request<string>(url, { method: 'POST' });
    }

    /**
     * 取消给消息添加的情绪（表情）
     * @category 消息
     * @param message_id 消息id
     * @param stamp_id 表情id
     * @returns 返回data为空字符串代表成功
     */
    async deleteMessageReaction(message_id: string, stamp_id: string) {
        const url = ApiHost + `/api/v1/messages/${message_id}/reaction/${stamp_id}`;
        return await this.request<string>(url, { method: 'DELETE' });
    }

    /**
     * 获取据点下所有话题的想法
     * @category 想法
     * @param node_id 话题/节点 id
     * @param limit 数量，默认20
     * @param sort 排序类型，默认为‘reply’ 按最后回复时间排序
     */
    async getNodeThoutghts(node_id: string, limit = 20, sort = 'reply') {
        const url = ApiHost + `/api/v1/nodes/${node_id}/thoughts?limit=${limit}&sort=${sort}`;
        return await this.request<Thoughts>(url, null, AuthMode.Free);
    }

    /**
     * 获取指定话题下的想法
     * @category 想法
     * @param topic_id 话题/节点id
     * @param limit 数量，默认20
     * @param sort 排序类型，默认为‘reply’ 按最后回复时间排序
     */
    async getTopicThoughts(topic_id: string, limit = 20, sort = 'reply') {
        const url = ApiHost + `/api/v1/topics/${topic_id}/thoughts?limit=${limit}&sort=${sort}`;
        return await this.request<Thoughts>(url, null, AuthMode.Free);
    }

    /**
     * 获取想法
     * @category 想法
     * @param thought_id 想法id 
     */
    async getThought(thought_id: string) {
        const url = ApiHost + `/api/v1/thoughts/${thought_id}`;
        return await this.request<Thought>(url, null, AuthMode.Free);
    }

    /**
     * 发表想法
     * @category 想法
     * @param topic_id 话题/节点id
     * @param thought 想法，参考{@link OutgoingThought}
     */
    async postThought(topic_id: string, thought: OutgoingThought) {
        const url = ApiHost + `/api/v1/topics/${topic_id}/thoughts`;
        const options: any = {
            method: 'POST',
            json: thought,
        };
        return await this.request<Thought>(url, options);
    }

    /**
     * 发表纯文本想法
     * @category 想法
     * @param topic_id 话题/节点id
     * @param text 文本
     */
    async postSimpleThought(topic_id: string, text: string) {
        return await this.postThought(topic_id, { status: text });
    }

    // TODO 待封装长文、图片、视频、链接想法，可能需要一个builder

    /**
     * 删除想法
     * @category 想法
     * @param thought_id 想法id
     * @returns 返回data为空字符串代表成功
     */
    async deleteThought(thought_id: string) {
        const url = ApiHost + `/api/v1/thoughts/${thought_id}`;
        return await this.request<string>(url, { method: 'DELETE' });
    }

    /**
     * 解析链接为嵌入内容
     * @category 想法
     * @param embedUrl 链接
     */
    async embeds(embedUrl: string) {
        const url = ApiHost + '/api/v1/embeds';
        const options: any = {
            method: 'POST',
            json: { url: embedUrl },
        };
        return await this.request<Embed>(url, options);
    }

    /**
     * 给想法添加情绪
     * @category 想法
     * @param though_id 想法id
     * @param stamp_id 表情id
     * @returns 返回data为空字符串代表成功
     */
    async addThoughtReaction(though_id: string, stamp_id: string) {
        const url = ApiHost + `/api/v1/thoughts/${though_id}/reaction/${stamp_id}`;
        return await this.request<string>(url, { method: 'POST' });
    }

    /**
     * 取消给想法添加的情绪
     * @category 想法
     * @param though_id 想法id
     * @param stamp_id 表情id
     * @returns 返回data为空字符串代表成功
     */
    async deleteThoughtReaction(though_id: string, stamp_id: string) {
        const url = ApiHost + `/api/v1/thoughts/${though_id}/reaction/${stamp_id}`;
        return await this.request<string>(url, { method: 'DELETE' });
    }

    /**
     * 获取想法下评论
     * 
     * 传递before=null, after='0' 按时间正序开始获取
     * 
     * 传递before=null, after=null 按时间倒序开始获取
     * @category 想法
     * @param though_id 想法id
     * @param limit 数量
     * @param before 评论id，获取该条评论之后的评论
     * @param after 评论id，获取该条评论之前的消评论，
     */
    async getComments(though_id: string, limit = 20, before?: string, after?: string) {
        let url = ApiHost + `/api/v1/thoughts/${though_id}/comments?limit=${limit}`;
        if (before)
            url += `&before=${before}`;
        if (after)
            url += `&after=${after}`;
        return await this.request<Comments>(url);
    }

    /**
     * 发表评论
     * @category 想法
     * @param though_id 想法id
     * @param content 文本内容
     * @param imageFile 图片文件 (可选)
     * @param parentId 要回复的评论id (可选)
     */
    async postComment(though_id: string, content: string, imageFile?: string, parentId?: string): Promise<Result<Comment>>;

    /**
     * 发表评论
     * @category 想法
     * @param though_id 想法id 
     * @param comment 评论
     */
    async postComment(though_id: string, comment: OutgoingComment): Promise<Result<Comment>>;

    async postComment(though_id: string, comment: OutgoingComment | string, imageFile?: string, parentId?: string) {
        const url = ApiHost + `/api/v1/thoughts/${though_id}/comments`;
        let options: any;
        if (typeof(comment) == 'string') {
            const data: OutgoingComment = {
                content: comment,
                parentId
            };
            if (imageFile) {
                const image = await this.uploadImage(imageFile);
                if (image.data) {
                    data.media = image.data.id;
                } else {
                    return { error: image.error };
                }
            }
            options = {
                method: 'POST',
                json: data,
            };
        } else {
            options = {
                method: 'POST',
                json: comment,
            };
        }
        return await this.request<Comment>(url, options);
    }

    /**
     * 删除评论
     * @category 想法
     * @param comment_id 评论id
     * @returns 返回data为空字符串代表成功
     */
    async deleteComment(comment_id: string) {
        const url = ApiHost + `/api/v1/comments/${comment_id}`;
        return await this.request<string>(url, { method: 'DELETE' });
    }

    /**
     * 给评论添加情绪
     * @category 想法
     * @param comment_id 评论id
     * @param stamp_id 表情id
     * @returns 返回data为空字符串代表成功
     */
    async addCommentReaction(comment_id: string, stamp_id: string) {
        const url = ApiHost + `/api/v1/comments/${comment_id}/reaction/${stamp_id}`;
        return await this.request<string>(url, { method: 'POST' });
    }

    /**
     * 取消给评论添加的情绪
     * @category 想法
     * @param comment_id 评论id
     * @param stamp_id 表情id
     * @returns 返回data为空字符串代表成功
     */
    async deleteCommentReaction(comment_id: string, stamp_id: string) {
        const url = ApiHost + `/api/v1/comments/${comment_id}/reaction/${stamp_id}`;
        return await this.request<string>(url, { method: 'DELETE' });
    }

    /**
     * 获取据点信息
     * @category 据点
     * @param node_id 据点id （数字或英文id，非MewCode）
     */
    async getNodeInfo(node_id: string) {
        const url = ApiHost + `/api/v1/nodes/${node_id}`;
        return await this.request<Node>(url, null, AuthMode.Free);
    }

    /**
     * 获取话题/节点信息
     * @category 据点
     * @param topic_id 话题/节点id 
     */
    async getTopicInfo(topic_id: string) {
        const url = ApiHost + `/api/v1/topics/${topic_id}`;
        return await this.request<Topic>(url, null, AuthMode.Free);
    }

    /**
     * 获取用户信息
     * @category 用户
     * @param username 用户Mew ID 
     */
    async getUserInfo(username: string) {
        const url = ApiHost + `/api/v1/users/${username}`;
        return await this.request<User>(url, null, AuthMode.NoAuth);
    }

    /**
     * 获取自身信息
     * @category 用户
     */
    async getMeInfo() {
        const url = ApiHost + '/api/v1/users/@me';
        return await this.request<User>(url);
    }

    /**
     * 获取表情
     * @category 通用
     */
    async getStamps() {
        const url = ApiHost + '/api/v1/stamps';
        return await this.request<Stamps>(url);
    }

    // #endregion HTTP API

}