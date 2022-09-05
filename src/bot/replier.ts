import { Spam } from "./spam.js";
import { IBot } from "./ibot.js";
import { Message } from "../mew/model/message.js";
import { Util } from "../commons/utils.js";

/**
 * 回复器测试结果
 */
export interface TestInfo {
    /**
     * 置信度，默认的选择函数中需要确保该值在[0,1]区间
     */
    confidence: number;
    /**
     * 额外数据，在{@link Replier.test}中赋值，传递给{@link Replier.reply}使用
     */
    data?: any;
    /**
     * 当前回复器在所属回复器集合中的下标，由外部设置
     */
    replierIndex?: number;
    /**
     * 测试选项，由外部设置
     */
    options?: TestParams;
}

/**
 * ```js
 * { confidence: 0 }
 * ```
 */
export const NoConfidence: TestInfo = { confidence: 0 };
/**
 * ```js
 * { confidence: .5 }
 * ```
 */
export const HalfConfidence: TestInfo = { confidence: .5 };
/**
 * ```js
 * { confidence: 1 }
 * ```
 */
export const FullConfidence: TestInfo = { confidence: 1 };

/**
 * 回复结果
 */
export interface ReplyResult {
    /**
     * 是否成功回复
     */
    success: boolean;
    /**
     * 是否需要撤回
     */
    recall?: {
        messageId: string;
        delay: number;
    }
}

/**
 * ```js
 * { success: true }
 * ```
 */
export const Replied: ReplyResult = { success: true };
/**
 * ```js
 * { success: false }
 * ```
 */
export const ReplyFailed: ReplyResult = { success: false };

/**
 * 测试参数
 */
export interface TestParams {
    /**
     * 是否为单纯的指令模式：指令模式开启，且其他触发方式未触发
     */
    isCommandMode: boolean;
    /**
     * 是否为回复我的消息
     */
    isReplyMe: boolean;
}

/**
 * 回复器挑选函数，用于挑选当前最匹配的回复器
 */
export type ReplierPickFunction = (repliers: Replier[], msg: Message, params: TestParams) => Promise<TestInfo | undefined>;

/**
 * 回复器基类
 */
export abstract class Replier {

    /**
     * 类型
     */
    abstract type: string;
    /**
     * 指令冷却检测
     */
    protected _spams: { [topicId: string]: Spam } = {};
    /**
     * 回复器在私聊中总是可用，默认为`true`，即{@link checkAvailable}方法在私聊中将总是返回`true`
     */
    protected _directAlwaysAvailable = true;

    /**
     * 回复器测试，此方法中对消息进行预处理，返回相应的置信度与预处理数据，参照{@link TestInfo}
     * 
     * bot收到一条消息后，将依次调用回复器的`test`方法，根据挑选函数选取最合适的回复器，执行其`reply`方法。
     * 
     * 默认的挑选函数{@link Replier.pick01}优先选择置信度为`1`的回复器。
     * @param msg 消息
     * @param options 测试参数
     */
    abstract test(msg: Message, options: TestParams): Promise<TestInfo>;

    /**
     * 回复消息，此方法中对消息进行回复。当回复器通过测试被选中时，此方法将被调用。
     * @param bot bot 
     * @param msg 待回复的消息
     */
    abstract reply(bot: IBot, msg: Message, test: TestInfo): Promise<ReplyResult>;

    /**
     * 初始化，在bot启动及配置刷新时被调用
     * 
     * @param bot bot
     */
    async init(bot: IBot) {
        const config = bot.config;
        // 初始化每个话题的Spam配置
        for (const key in config.topics) {
            if (!config.topics[key].repliers[this.type])
                continue;
            const spamConfig = config.topics[key].repliers[this.type].spam;
            if (!spamConfig)
                continue;

            if (this._spams[key]) {
                this._spams[key].init(spamConfig.interval, spamConfig.threshold, spamConfig.cooldown);
            } else {
                this._spams[key] = new Spam(spamConfig.interval, spamConfig.threshold, spamConfig.cooldown);
            }
        }
    }

    /**
     * 获取当前话题的回复器配置
     * 
     * @param bot bot
     * @param topic_id 话题id
     */
    protected getConfig(bot: IBot, topic_id: string) {
        const type = this.type.split('/')[0];
        if (bot.config.topics[topic_id]) {
            if (bot.config.topics[topic_id].repliers[type])
                return bot.config.topics[topic_id].repliers[type];
            else return bot.config.topics[topic_id].repliers['all'];
        }
        return;
    }

    /**
     * 判断回复器在话题（节点）中是否可用，不可用时，默认回复不可用提示
     * @param bot bot
     * @param msg 待回复消息
     * @param shouldReply 不可用时，是否直接回复功能不可用提示，默认为`true`
     */
    protected async checkAvailable(bot: IBot, msg: Message, shouldReply = true): Promise<boolean> {
        if (msg._isDirect && this._directAlwaysAvailable) return true;
        const conf = this.getConfig(bot, msg.topic_id);
        if (!conf) {
            if (shouldReply) {
                // 回复提示文本
                await bot.replyText(msg, Util.randomItem(bot.config.hints.replierUnavailable));
            }
            return false;
        }
        return true;
    }

    /**
     * 冷却检测
     * @param topic_id 话题id
     * @param targetId 目标id，可以是话题id、用户id
     */
    protected checkSpam(topic_id: string, targetId: string) {
        const spam = this._spams[topic_id];
        if (spam) {
            return spam.check(targetId);
        }
        return { pass: true };
    }

    /**
     * 记录冷却
     * @param topic_id 话题id
     * @param targetId 目标id，可以是话题id、用户id
     */
    protected recordSpam(topic_id: string, targetId: string) {
        const spam = this._spams[topic_id];
        if (spam)
            spam.record(targetId);
    }

    /**
     * 回复器挑选函数，挑选置信度为1且优先级最高的回复器
     * @param repliers 回复器集合
     * @param msg 消息
     * @param params 测试参数
     */
    static async pick01(repliers: Replier[], msg: Message, params: TestParams) {
        for (let i = 0; i < repliers.length; i++) {
            const t = await repliers[i].test(msg, params);
            if (t.confidence == 1) {
                t.replierIndex = i;
                return t;
            }
        }
        return;
    }

    /**
     * 回复器挑选函数，挑选置信度最高且优先级最高的回复器
     * @param repliers 回复器集合
     * @param msg 消息
     * @param params 测试参数
     */
    static async pick(repliers: Replier[], msg: Message, params: TestParams) {
        const tests = new Array<TestInfo>();
        for (let i = 0; i < repliers.length; i++) {
            const t = await repliers[i].test(msg, params);
            if (t.confidence > 0) {
                t.replierIndex = i;
                tests.push(t);
            }
        }
        if (tests.length != 0) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_stability
            tests.sort((a, b) => b.confidence - a.confidence);
            return tests[0];
        }
        return;
    }

    /**
     * 回复器挑选函数，挑选置信度为1且优先级最高的回复器，如果没有1，则从最高置信度的回复器中随机选取一个
     * @param repliers 回复器集合
     * @param msg 消息
     * @param params 测试参数
     */
    static async pick01Fuzzy(repliers: Replier[], msg: Message, params: TestParams) {
        const tests = new Array<TestInfo>();
        for (let i = 0; i < repliers.length; i++) {
            const t = await repliers[i].test(msg, params);
            if (t.confidence > 0) {
                t.replierIndex = i;
                if (t.confidence == 1)
                    return t;
                tests.push(t);
            }
        }
        if (tests.length != 0) {
            tests.sort((a, b) => b.confidence - a.confidence);
            let range = 1;
            for(; range < tests.length; ++range) {
                if (tests[0].confidence != tests[range].confidence)
                    break;
            }
            return tests[Util.randomInt(0, range - 1)];
        }
        return;
    }

}

/**
 * 套娃回复器测试结果
 */
export interface MatryoshkaTestInfo extends TestInfo {
    /**
     * 当前回复器在所属回复器集合中的下标，由外部设置
     */
    subReplierIndex?: number;
}

/**
 * 套娃回复器
 */
export abstract class MatryoshkaReplier extends Replier {
    
    abstract override type: string;

    /**
     * 子回复器集合
     */
    protected _children!: Array<Replier>;
    /**
     * 回复器挑选函数
     */
    protected _pickFunc = Replier.pick;
    /**
     * {@link test}方法中，保持被选中的子回复器的测试置信度，默认为`false`，将使用`1`覆盖
     */
    protected _keepChildConfidence = false;

    override async init(bot: IBot): Promise<void> {
        await super.init(bot);
        for (const child of this._children) {
            await child.init(bot);
        }
    }

    override async test(msg: Message, options: TestParams) {
        if (!msg.content) {
            return NoConfidence;
        }
        const t = await this._pickFunc(this._children, msg, options) as MatryoshkaTestInfo;
        if (t) {
            t.subReplierIndex = t.replierIndex;
            t.replierIndex = -1;
            if (!this._keepChildConfidence)
                t.confidence = 1;
            return t;
        }
        else return NoConfidence;
    }

    override async reply(bot: IBot, msg: Message, test: TestInfo) {
        // 功能在此话题是否可用
        if (!await this.checkAvailable(bot, msg))
            return Replied;

        // 是否冷却中
        const spamCheck = this.checkSpam(msg.topic_id, msg.topic_id);
        if (!spamCheck.pass) {
            if (spamCheck.failedTimes! <= 1) {
                await bot.replyText(msg, this.getCooldownHint());
                return Replied;
            } else {
                const hint = await bot.replyText(msg, this.getCooldownHint(spamCheck.remain! / 1000));
                if (hint.data) {
                    return {
                        success: true,
                        recall: { messageId: hint.data.id, delay: 2000 }
                    };
                } else {
                    return Replied;
                }
            }
        }

        // 执行子回复器
        const info = test as MatryoshkaTestInfo;
        const replier = this._children[info.subReplierIndex as number];
        const result = await replier.reply(bot, msg, info);

        if (result?.success) {
            // 记录Spam
            this.recordSpam(msg.topic_id, msg.topic_id);
        }

        return result;
    }

    /**
     * 获取冷却提示文本
     * @param remainTime 剩余时间
     */
    protected getCooldownHint(remainTime?: number) {
        if (remainTime) {
            return `指令冷却中，请${Util.getTimeCounterText(remainTime)}后再试`;
        } else {
            return '指令冷却中，请稍后再试';
        }
    }

}
