import { Defender } from "./defender.js";
import { BotConfig, MesageReplyMode } from "./config.js";
import { IBot, InitOptions, IServerImageDao } from "./ibot.js";
import { Replier, ReplierPickFunction, ReplyResult, TestInfo } from "./replier.js";
import { IBotStorage } from "./storage/istorage.js";
import { FileStorage } from "./storage/file-storage.js";
import { MewClient } from "../mew/mew-client.js";
import { logger } from "../commons/logger.js";
import { Util } from "../commons/utils.js";
import { Constants } from "../mew/constants.js";
import { Result } from "../mew/model/common.js";
import { Message, OutgoingMessage, MediaImageInfo } from "../mew/model/message.js";
import { User } from "../mew/model/user.js";

/**
 * MewBot
 */
export class MewBot implements IBot {

    protected _client = new MewClient();
    /**
     * MewClient
     */
    get client(): MewClient { return this._client; }
    protected _storage!: IBotStorage;
    /**
     * 存储
     */
    get storage(): IBotStorage { return this._storage; }
    /**
     * 当前配置项
     */
    get config(): Required<BotConfig> { return this._storage.config; }
    /**
     * 自身信息
     */
    protected _me!: User;
    /**
     * Mew ID、昵称、别名集合
     */
    protected _names!: Array<string>;
    /**
     * 识别@ 
     */
    protected _atRegex: RegExp | null = null;
    /**
     * 防御机制
     */
    protected _defender!: Defender;
    /**
     * 消息队列，接收到的消息将存入该队列，按处理间隔逐个处理
     */
    protected _msgQueue = new Array<Message>();
    /**
     * 回复器集合
     */
    protected _repliers!: Array<Replier>;
    /**
     * 回复器挑选函数，内置实现参照 {@link Replier.pick01}（默认）, {@link Replier.pick} 
     */
    protected _pickFunc!: ReplierPickFunction;

    /**
     * 初始化
     * @param options 选项 
     */
    constructor(options?: InitOptions) {
        const opt = options? options : {} as InitOptions;
        this._storage = opt.storage? opt.storage : new FileStorage();
        this._repliers = opt.repliers? opt.repliers : [];
        this._pickFunc = opt.replierPickFunction? opt.replierPickFunction : Replier.pick01;
    }


    /**
     * 启动
     */
    async launch() {
        // 初始化Storage
        await this._storage.init();

        // 登录授权
        const account = await this._storage.getAccount();
        if (!account) return;
        if (account.token) {
            this._client.setToken(account.token);
            logger.debug('Authorization token set.');
        } else if (account.username && account.password) {
            const auth = await this._client.login(account.username, account.password);
            if (auth.data) {
                logger.debug('Logged in.');
            } else {
                logger.error('Login failed.');
                return;
            }
        } else {
            logger.error('No account, please check your account configuration.');
            return;
        }

        // 获取自身信息
        const me = await this._client.getMeInfo();
        if (me.data) {
            this._me = me.data;
        } else {
            logger.error('Get self info failed.');
            return;
        }

        // 刷新
        await this.refresh();
        
        // 订阅消息事件
        this._client.on('message_create', data => {
            this._msgQueue.push(data);
        });
        // 开启消息处理
        setInterval(() => this.processMessages(), this.config.messageProcessInterval);

        // 开启连接
        this._client.connect({ subcriptionNodes: this.config.nodes });
    }

    /**
     * 刷新，将会刷新配置项，重新初始化防御机制，重新初始化所有回复器
     * 
     * 利用此方法可在bot运行时动态变更配置
     */
    async refresh() {
        logger.debug('MewBot Refreshing...');
        // 刷新配置项
        await this._storage.refreshConfig();
        // 刷新屏蔽列表
        await this._storage.refreshBlockList();
        // 初始化bot名称
        this.initNames();
        // 初始化防御机制
        this._defender = new Defender(this._storage, this.config.defender.interval, this.config.defender.threshold);
        // 初始化所有回复器
        await this.initRepliers();
        logger.debug('MewBot Refreshed.');
    }

    /**
     * 初始化名称，用于识别@ 消息
     */
    protected initNames() {
        this._names = new Array<string>();
        if (this.config.triggers.username)
            this._names.push(this._me.username);
        if (this.config.triggers.name)
            this._names.push(this._me.name);
        if (this.config.triggers.alias)
            this._names.push(...this.config.alias);
        if (this._names.length == 0)
            this._atRegex = null;
        else
            this._atRegex = new RegExp(`[@＠](${this._names.join('|')})`, 'g');
        logger.debug('@bot regex: ' + this._atRegex);
    }

    /**
     * 初始化所有回复器
     */
    protected async initRepliers() {
        for (const replier of this._repliers) {
            await replier.init(this);
        }
    }

    /**
     * 处理消息队列
     */
    protected processMessages() {
        if (this._msgQueue.length == 0) {
            return;
        }
        const msg = this._msgQueue.shift() as Message;
        (async ()=> this.doProcessMessage(msg))();
    }

    /**
     * 处理单条消息
     */
    protected async doProcessMessage(msg: Message) {
        // 用户在屏蔽列表中，返回
        if (this._defender.isBlocked(msg._author.id)) {
            logger.debug(`Message from blocked user: ${msg._author.name} @${msg._author.username}`);
            return;
        }

        // 判断是否触发
        let isTriggered = false;
        const isReplyMe = this.isReplyMe(msg);

        // 判断是否符合回复条件
        if (msg._isDirect) {    
            // 私聊
            // 配置不回复私聊，返回
            if (!this.config.replyDM) return;
            // 忽略私聊中由自己发出的消息
            if (msg._author.id == this._me.id) return;
            isTriggered = true;
            logger.debug(`Direct Message: ${msg.content}`);
        } else {    
            // 群聊
            // 不在配置中的话题（节点），返回
            if (!Reflect.has(this.config.topics, msg.topic_id)) return;
            // 配置不回复来自自身的消息，返回
            if (!this.config.replySelf && msg._author.id == this._me.id) return;
            logger.debug(`Public Message: ${msg.content}`);
            // 非识别指令模式
            if (!this.config.triggers.command) {
                // 回复功能触发
                if (this.config.triggers.reply) {
                    isTriggered = isReplyMe;
                }
                // @bot触发
                if (!isTriggered && msg.content && this._atRegex) {
                    if (!isTriggered && msg.content.search(this._atRegex) != -1) {
                        isTriggered = true;
                        this._atRegex.lastIndex = 0;
                    }
                }
            }
        }
        
        // 挑选匹配的回复器
        let testInfo: TestInfo | undefined;
        if (isTriggered || this.config.triggers.command) {
            await this.onReplierPreTest(msg);
            /**
             * 默认的pickFunc参照 {@link Replier.pick01}, {@link Replier.pick} 
             */
            testInfo = await this._pickFunc(this._repliers, msg, {
                isCommandMode: !isTriggered && this.config.triggers.command, 
                isReplyMe,
            });
        }
        if (!testInfo) return;

        // 执行回复
        const replier = Util.getElemSafe(this._repliers, testInfo.replierIndex!);
        if (!replier) return;
        const result = await replier.reply(this, msg, testInfo);
        if (result && result.success) {
            // ...额外处理逻辑
            await this.onReplierPostReply(msg, result);
            return;
        } else {
            logger.error(`Reply failed: ${replier.type}`);
        }
    }

    /**
     * 判断是否是回复我的消息
     * @param msg 消息
     */
    protected isReplyMe(msg: Message) {
        if (msg._otherUsers.length == 0) return false;
        if (!msg.reply_to_message_id) return false;
        // 作者不是我 且 相关用户信息中有我
        for (const user of msg._otherUsers) {
            if (user.id == this._me.id) return true;
        }
        return false;
    }

    /**
     * 对消息进行回复器测试前调用
     * @param msg 消息
     */
    protected async onReplierPreTest(msg: Message) {
        // 去除可能存在的@bot，trim
        if (msg.content) {
            if (this._atRegex) {
                msg.content = msg.content.replace(this._atRegex, '');
                this._atRegex.lastIndex = 0;
            }
            msg.content = msg.content.trim();
        }
    }

    /**
     * 回复器成功回复消息后调用
     * @param msg 消息
     * @param result 回复结果
     */
    protected async onReplierPostReply(msg: Message, result: ReplyResult) {
        // 记录到Defender
        this._defender.record(msg._author);
        // 是否需要撤回
        if (result.recall?.messageId) {
            await Util.sleep(result.recall.delay);
            await this.client.deleteMessage(result.recall.messageId);
        }
    }

    /**
     * 生成 @对方 文本
     * @param to 要回复的消息
     */
    protected getReplyTitle(to: Message) {
        if (to._isDirect) return '';
        // 群聊中可以回复来自自己的消息
        // 为了避免陷入死循环，对方名称含有bot名时不能加上@对方名
        if (this._names.indexOf(to._author.name) != -1
            || (this._atRegex && to._author.name.search(this._atRegex) != -1)) {
            if (this._atRegex)
                this._atRegex.lastIndex = 0;
            if (this._names.indexOf(to._author.username) != -1)
                return '';
            else
                return `@${to._author.username} `;
        }
        return `@${to._author.name} `;
    }

    /**
     * 根据当前回复模式，获取要回复的消息id
     * @param to 待回复的消息 
     * @param messageReplyMode 回复模式
     */
    protected getReplyMessageId(to: Message, messageReplyMode?: MesageReplyMode) {
        messageReplyMode = messageReplyMode || this.config.messageReplyMode;
        if (messageReplyMode == MesageReplyMode.Always) {
            return to.id;
        } else if (messageReplyMode == MesageReplyMode.Derivative) {
            if (to.reply_to_message_id)
                return to.id;
        }
        return;
    }

    async reply(to: Message, message: OutgoingMessage, messageReplyMode?: MesageReplyMode) {
        message.replyToMessageId = this.getReplyMessageId(to, messageReplyMode);
        return await this._client.sendMessage(to.topic_id, message);
    }

    async replyText(to: Message, content: string, messageReplyMode?: MesageReplyMode, addReplyTitle = true) {
        const replyToMessageId = this.getReplyMessageId(to, messageReplyMode);
        // 只要使用了回复功能，就无需加上@对方
        if (!replyToMessageId && addReplyTitle)
            content = this.getReplyTitle(to) + content;
        if (content.length > Constants.MaxMessageContentLength) {
            return (await this._client.sendTextMessageSafely(to.topic_id, content, replyToMessageId))[0];
        } else {
            return await this._client.sendTextMessage(to.topic_id, content, replyToMessageId);
        }
    }

    async replyStamp(to: Message, stampId: string, messageReplyMode?: MesageReplyMode) {
        logger.debug(`To: ${to.content}  Reply Stamp: ${stampId}`);
        const replyToMessageId = this.getReplyMessageId(to, messageReplyMode);
        return await this._client.sendStampMessage(to.topic_id, stampId, replyToMessageId);
    }

    async replyThought(to: Message, thoughtId: string, messageReplyMode?: MesageReplyMode) {
        logger.debug(`To: ${to.content}  Reply Thought: ${thoughtId}`);
        const replyToMessageId = this.getReplyMessageId(to, messageReplyMode);
        return await this._client.sendThoughtMessage(to.topic_id, thoughtId, replyToMessageId);
    }

    async replyImage(to: Message, imageFile: string, messageReplyMode?: MesageReplyMode) {
        logger.debug(`To: ${to.content}  Reply Image: ${imageFile}`);
        const replyToMessageId = this.getReplyMessageId(to, messageReplyMode);
        return await this._client.sendImageMessage(to.topic_id, imageFile, replyToMessageId);
    }

    async replyImageWithCache(to: Message, imageFile: string, dao: IServerImageDao, messageReplyMode?: MesageReplyMode) {
        logger.debug(`To: ${to.content}  Reply Image With Cache: ${imageFile}`);
        const result = await this.handleImageWithCache(imageFile, dao);
        if (result.data) {
            return await this.reply(to, { media: [result.data.id] }, messageReplyMode);
        } else {
            return { error: result.error };
        }
    }

    async sendImageWithCache(topic_id: string, imageFile: string, dao: IServerImageDao) {
        logger.debug(`To: ${topic_id}  Send Image With Cache: ${imageFile}`);
        const result = await this.handleImageWithCache(imageFile, dao);
        if (result.data) {
            return await this.client.sendMessage(topic_id, { media: [result.data.id] });
        } else {
            return { error: result.error };
        }
    }

    async handleImageWithCache(imageFile: string, dao: IServerImageDao): Promise<Result<MediaImageInfo>> {
        const serverImage = await dao.findByFileName(imageFile);
        let info;
        if (serverImage && serverImage.info) {
            const isAlive = await Util.isUrlAlive(serverImage.info.url);
            if (isAlive) {
                info = serverImage.info;
            } else {
                // 图片已失效，移除记录
                await dao.deleteByFileName(imageFile);
            }
        }
        if (!info) {
            // 上传图片
            const result = await this._client.uploadImage(imageFile);
            // 记录
            if (result.data && result.data.id) {
                info = result.data;
                await dao.insertOne({ fileName: imageFile, info });
            } else {
                return { error: result.error };
            }
        }
        return { data: info };
    }

}
