import * as fs from "fs";
import { HttpsProxyAgent } from "hpagent";
import { ConnectOptions, logger, LogLevel, MewClient, ServerInfo } from "../src/index.js";

const USE_PROXY = true;
const PROXY = "http://localhost:7890";

logger.logLevel = LogLevel.Verbose;
const accountPath = './test/account.json';
let client: MewClient;

export async function getMewClient(needAuth = true) {
    if (!client) {
        const options: Partial<ConnectOptions> = {
            serverInfo: vrollServerInfo
        };
        if (USE_PROXY) {
            options.agent = new HttpsProxyAgent({
                keepAlive: true,
                keepAliveMsecs: 1000,
                maxSockets: 256,
                maxFreeSockets: 256,
                scheduling: 'lifo',
                proxy: PROXY,
            });
        }
        client = new MewClient(options);
    }

    if (needAuth && !client.hasAuth) {
        if (!fs.existsSync(accountPath)) {
            logger.error('account.json not found.');
        }
        const raw = fs.readFileSync(accountPath).toString();
        const account = JSON.parse(raw);
        if (account.token) {
            client.setToken(account.token);
        } else if (account.username && account.password) {
            await client.login(account.username, account.password);
        } else {
            logger.error('Cannot find a valid account in account.json');
            return null;
        }
    }
    return client;
}

const vrollServerInfo: ServerInfo = {
    apiHost: 'https://api.vroll.me',
    wsHost: 'wss://gateway.vroll.me/socket.io/?EIO=4&transport=websocket',
    getHeaders(): Record<string, any> {
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            'Referer': 'https://vroll.me/',
            'Origin': 'https://vroll.me',
        };
    },
    getWsHeaders(): Record<string, any> {
        return {
            'Host': 'gateway.vroll.me',
            'Connection': 'Upgrade',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
            'Upgrade': 'websocket',
            'Origin': 'https://vroll.me',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        };
    }
};
