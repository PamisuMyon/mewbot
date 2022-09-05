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

    /**
     * 获取账号信息
     */
    getAccount(): Promise<Account | undefined>;

    /**
     * 刷新bot配置
     */
    refreshConfig(): Promise<Required<BotConfig>>;

    /**
     * 获取bot配置
     */
    get config(): Required<BotConfig>;

    /**
     * 刷新屏蔽列表
     */
    refreshBlockList(): Promise<Array<Partial<User>>>;

    /**
     * 更新屏蔽列表
     * @param blockList 新的屏蔽列表 
     */
    updateBlockList(blockList: Array<Partial<User>>): Promise<void>;

    /**
     * 获取屏蔽列表
     */
    get blockList(): Array<Partial<User>>;
}
