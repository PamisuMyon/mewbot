/**
 * bot配置项，默认配置参考 {@link defaultConfig}
 * 
 * 大部分配置支持在bot运行时动态刷新，参考{@link IBotStorage} {@link FileStorage}
 */
export interface BotConfig {
    /**
     * bot别名，在判断@bot时与bot的账号、用户名等效 
     */ 
    alias?: string[];
    /**
     * 群聊中触发bot的方式
     */
    triggers: {
        /**
         * at模式，@MEWID
         */
        username: boolean;
        /**
         * at模式，@昵称
         */
        name: boolean;
        /**
         * at模式，@别名
         */
        alias: boolean;
        /**
         * at模式，预留未来可能会有的官方@功能
         */
        mention: boolean;
        /**
         * 回复模式，回复bot的消息将触发bot
         */
        reply: boolean;
        /**
         * 识别指令模式
         * 
         * 该模式开启时，只要有匹配的回复器即可触发，具体匹配逻辑由回复器自定义。可实现传统的指令模式bot，也可用于识别特定内容并执行相关操作。
         */
        command: boolean;
    };
    /**
     * 是否回复群聊中来自自己的消息，可用于只有一个账号时的调试（回复自身消息时不触发）
     * 
     * 为`true`时，可能会被自身发出的回复消息触发死循环，关闭{@link BotConfig.triggers.name}与{@link BotConfig.triggers.command}可避免大部分情况
     */
    replySelf?: boolean;
    /**
     * 是否回复私聊消息
     */
    replyDM?: boolean;
    /**
     * 回复功能模式
     */
    messageReplyMode?: MesageReplyMode;
    /**
     * 消息处理间隔（毫喵）
     */
    messageProcessInterval?: number;
    /**
     * 订阅据点，将会收到来自这些据点的消息
     */
    nodes: string[];
    /**
     * 话题（节点）功能静态配置
     * 
     * 群聊中仅回复已配置话题中的消息，同时通过此配置实现话题中的功能定制
     */
    topics: TopicsConfig;
    /**
     * 提示文本
     */
    hints?: {
        /**
         * 回复器在此话题/节点不可用
         */
        replierUnavailable: string[];
        /**
         * 缺省回答
         */
        fallback: string[];
    };
    /**
     * 防御机制，用来避免短时间内被频繁刷屏，例如两个bot互相回复陷入死循环
     */
    defender?: {
        /**
         * 连击生效间隔
         */
        interval: 1500;
        /**
         * 防御连击阈值，达到此阈值时将对方加入屏蔽列表
         */
        threshold: 10;
    };
}

/**
 * 回复消息时使用回复功能的模式
 */
export enum MesageReplyMode {
    /**
     * `none` 不做任何操作（不使用回复功能）
     */
    None = 'none',
    /**
     * `always` 总是使用回复功能（有消息id可以回复时）
     */
    Always = 'always',
    /**
     * `derivative` 仅在衍生话题中使用回复功能，即回复bot的消息、回复他人的消息但触发bot
     */
    Derivative = 'derivative',
}

/**
 * 话题/节点配置集合
 */
export interface TopicsConfig {
    [topicId: string]: TopicConfig;
}

/**
 * 话题/节点配置
 */
export interface TopicConfig {
    /**
     * 话题/节点id
     */
    id: string;
    /**
     * 话题/节点名称
     */
    name: string;
    /**
     * 是否为静态配置，静态配置不可在运行中被移除
     */
    isStatic?: boolean;
    /**
     * 回复器配置，`key`对应{@link Replier.type}，为`all`时表示启用所有回复器
     */
    repliers: { [type: string]: ReplierConfig };
}

/**
 * 回复器配置
 */
export interface ReplierConfig {
    /**
     * 自定义属性
     */
    [key: string]: any;
    /**
     * 指令冷却配置 参照{@link Spam}
     */
    spam?: {
        /**
         * 连击生效间隔
         */
        interval?: number;
        /**
         * 冷却连击阈值
         */
        threshold?: number;
        /**
         * 冷却时间 单位毫秒
         */
        cooldown?: number;
    }
}

export interface Account {
    token?: string;
    username?: string;
    password?: string;
}

/**
 * 默认配置
 */
export const defaultConfig: Required<BotConfig> = {
    alias: [],
    triggers: {
        username: true,
        name: false,
        alias: true,
        mention: true,
        reply: true,
        command: false,
    },
    replySelf: true,
    replyDM: true,
    messageReplyMode: MesageReplyMode.Derivative,
    messageProcessInterval: 200,
    // 订阅据点，将会收到来自这些据点的消息
    nodes: [
        "100554577263091712", // 不是机器人
    ],
    // 话题（节点）功能配置，群聊中仅回复已配置话题中的消息，同时通过此配置实现话题中的功能定制
    topics: {
        // 在 不是机器人据点 的 🍄 话题（节点）中，配置功能
        "219353468583456768": {
            id: "219353468583456768",
            name: "🍄",
            repliers: { all: {} }
        },
    },
    // 提示文本
    hints: {
        replierUnavailable: [
            "对不起，本节点不支持这个功能😿"
        ],
        fallback: [
            "我不知道怎么跟你说，因为我只是一个机器人",
        ]
    },
    // 防御机制，用来避免短时间内被频繁刷屏，例如两个bot互相回复陷入死循环
    defender: {
        interval: 1500,
        threshold: 10, // 防御连击阈值，达到此阈值时将对方加入屏蔽列表
    },
};
