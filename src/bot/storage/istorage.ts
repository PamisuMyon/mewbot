import { User } from "../../mew/model/user.js";
import { Account, BotConfig } from "../config.js";

/**
 * 存储接口
 */
export interface IBotStorage {

    /**
     * 初始化，在{@link IBot.launch}时调用
     */
    init(): Promise<void>;

    getAccount(): Promise<Account | undefined>;

    refreshConfig(): Promise<Required<BotConfig>>;

    get config(): Required<BotConfig>;

    refreshBlockList(): Promise<Array<Partial<User>>>;

    updateBlockList(blockList: Array<Partial<User>>): Promise<void>;

    get blockList(): Array<Partial<User>>;
}
