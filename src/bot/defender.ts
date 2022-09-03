import { logger } from "../commons/logger.js";
import { User } from "../mew/model/user.js";
import { Spam } from "./spam.js";
import { IBotStorage } from "./storage/istorage.js";

/**
 * 防御机制，用来避免短时间内被频繁刷屏，例如两个bot互相回复陷入死循环
 */
export class Defender {

    protected _spam: Spam;
    protected _storage!: IBotStorage;

    /**
     * @param interval 连击生效间隔
     * @param threshold 防御连击阈值
     */
    constructor(storage: IBotStorage, interval = 1000, threshold = 10) {
        this._storage = storage;
        this._spam = new Spam(interval, threshold);
    }

    record(user: User) {
        this._spam.record(user.id);
        if (!this._spam.check(user.id).pass) {
            this.addToBlockList(user);
        }
    }

    isBlocked(user_id: string) {
        return this._storage.blockList.find(v => v.id == user_id) != undefined;
    }

    async addToBlockList(user: User) {
        this._storage.blockList.push({
            id: user.id,
            username: user.username,
            name: user.name,
        });
        this._storage.updateBlockList(this._storage.blockList);
        logger.debug(`User added to block list: ${user.name} @${user.username}`);
    }

}