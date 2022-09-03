import { IBotStorage } from "./istorage.js";
import { Account, BotConfig, defaultConfig } from "../config.js";
import { User } from "../../mew/model/user.js";
import { FileUtil } from "../../commons/file-util.js";
import { logger } from "../../commons/logger.js";

/**
 * 文件存储实现
 */
export class FileStorage implements IBotStorage {

    protected _accountPath = './storage/account.json';
    protected _configPath = './storage/config.json';
    protected _blockListPath = './storage/block-list.json';
    protected _config!: Required<BotConfig>;
    get config(): Required<BotConfig> { return this._config; }
    protected _blockList!: Array<Partial<User>>;
    get blockList() { return this._blockList; }

    async init(): Promise<void> {
    }

    async getAccount() {
        const account = await FileUtil.readJson(this._accountPath) as Account;
        if (!account) return;
        if (account.token || (account.username && account.password)) {
            return account;
        } else {
            logger.error('Cannot find a valid account in account.json');
        }
        return;
    }

    async refreshConfig() {
        this._config = await FileUtil.readJson(this._configPath, false) as Required<BotConfig>;
        if (!this._config) {
            logger.info(`Read ${this._configPath} failed, using default config.`);
        }
        this._config = {
            ...defaultConfig,
            ...this._config,
        };
        return this._config;
    }

    async refreshBlockList() {
        this._blockList = await FileUtil.readJson(this._blockListPath, false) as Array<Partial<User>>;
        if (!this._blockList)
            this._blockList = [];
        return this._blockList;
    }

    async updateBlockList(blockList: Partial<User>[]) {
        await FileUtil.write(this._blockListPath, JSON.stringify(blockList));
        this._blockList = blockList;
    }

}
