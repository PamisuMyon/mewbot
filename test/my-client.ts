import * as fs from "fs";
import { logger, LogLevel, MewClient } from "../src/index.js";

logger.logLevel = LogLevel.Error;
const accountPath = './test/account.json';
const client = new MewClient();

export async function getMewClient(needAuth = true) {
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
