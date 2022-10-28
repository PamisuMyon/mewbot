// Mew Client 自定义类型

import { HttpsProxyAgent } from "hpagent";
import { defaultServerInfo, ServerInfo } from "../server_info.js";

/**
 * 请求时的授权模式
 */
export enum AuthMode {
    /**
     * 无需授权
     */
    NoAuth, 
    /**
     * 必须授权
     */
    NeedAuth, 
    /**
     * 可不授权
     * 如有授权token，则使用token，否则不使用
     */
    Free
}

export enum ConnectStatus {
    None, Connecting, Connected
}

/**
 * MewClient连接选项
 */
export interface ConnectOptions {
    /**
     * 订阅据点id集合
     */
    subcriptionNodes: string[];
    /**
     * WebSocket握手超时
     */
    handshakeTimeout: number;
    /**
     * 心跳检测间隔，超过此间隔为检测到心跳，则自动重连
     */
    heartbeatCheckTimeout: number;
    /**
     * 重连前的延时
     */
    reconnectTimeout: number;
    /**
     * ServerInfo
     */
    serverInfo: ServerInfo;
    /**
     * Agent
     */
    agent?: HttpsProxyAgent;
}

/**
 * 初始化MewClient连接选项（内部自动调用）
 */
export function initConnectOptions(options?: Partial<ConnectOptions>) : ConnectOptions {
    const defaults = {
        subcriptionNodes: [],
        handshakeTimeout: 10000,
        heartbeatCheckTimeout: 50000,
        reconnectTimeout: 100,
        serverInfo: defaultServerInfo,
    };
    return {
        ...defaults,
        ...options,
    };
}
