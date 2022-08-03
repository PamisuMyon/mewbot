// Mew Client 自定义类型

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

export interface ConnectOptions {
    subcriptionNodes: string[];
    handshakeTimeout: number;
    heartbeatCheckTimeout: number;
    reconnectTimeout: number;
}

export function initConnectOptions(options?: Partial<ConnectOptions>) : ConnectOptions {
    const defaults = {
        subcriptionNodes: [],
        handshakeTimeout: 10000,
        heartbeatCheckTimeout: 50000,
        reconnectTimeout: 100,
    };
    return {
        ...defaults,
        ...options,
    };
}

