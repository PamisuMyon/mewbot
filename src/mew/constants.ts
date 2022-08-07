export const ApiHost = 'https://api.mew.fun';

export const WsHost = 'wss://gateway.mew.fun/socket.io/?EIO=4&transport=websocket';

export function getHeaders(): Record<string, any> {
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'Referer': 'https://mew.fun/',
        'Origin': 'https://mew.fun',
    };
}

export function getWsHeaders(): Record<string, any> {
    return {
        'Host': 'gateway.mew.fun',
        'Connection': 'Upgrade',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Upgrade': 'websocket',
        'Origin': 'https://mew.fun',
        // 'Sec-WebSocket-Version': '13',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        // 'Cookie': '_ga=GA1.1.446877051.1623140979; aliyungf_tc=545c78f5a952339a4d514c33d64f9cab32a54a80b5c99a142c3501c47af24add; _ga_9K3W6HRE77=GS1.1.1625969684.247.0.1625969684.0',
        // 'Sec-WebSocket-Key': '68plGdQY1Xl4cKGuedxWog==',
        // 'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
    };
}

export const Constants = {
    MaxMessageContentLength: 2000,
};
