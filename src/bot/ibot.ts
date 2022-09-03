import { MewClient } from "../mew/mew-client.js";
import { Result } from "../mew/model/common.js";
import { Message, OutgoingMessage, MediaImageInfo } from "../mew/model/message.js";
import { BotConfig, MesageReplyMode } from "./config.js";
import { Replier, ReplierPickFunction } from "./replier.js";
import { IBotStorage } from "./storage/istorage.js";

/**
 * Bot接口，用来定义Bot需要对外提供的接口
 */
export interface IBot {

    /**
     * MewClient
     */
    get client(): MewClient;

    /**
     * 存储
     */
    get storage(): IBotStorage;

    /**
     * 配置
     */
    get config(): Required<BotConfig>;

    /**
     * 启动
     */
    launch(): Promise<void>;

    /**
     * 刷新，应刷新配置与所有回复器等
     */
    refresh(): Promise<void>;

    /**
     * 回复
     * @param to 待回复消息
     * @param message 消息
     * @param messageReplyMode 回复模式，默认使用配置值
     */
    reply(to: Message, message: OutgoingMessage, messageReplyMode?: MesageReplyMode): Promise<Result<Message>>;

    /**
     * 回复文本
     * @param to 待回复消息
     * @param reply 文本
     * @param messageReplyMode 回复模式，默认使用配置值
     * @param addReplyTitle 是否加上@对方
     */
    replyText(to: Message, reply: string, messageReplyMode?: MesageReplyMode, addReplyTitle?: boolean): Promise<Result<Message>>;

    /**
     * 回复表情
     * @param to 待回复消息
     * @param stampId 表情
     * @param messageReplyMode 回复模式，默认使用配置值
     */
    replyStamp(to: Message, stampId: string, messageReplyMode?: MesageReplyMode): Promise<Result<Message>>;

    /**
     * 转发想法
     * @param to 待回复消息
     * @param thoughtId 想法
     * @param messageReplyMode 回复模式，默认使用配置值
     */
    replyThought(to: Message, thoughtId: string, messageReplyMode?: MesageReplyMode): Promise<Result<Message>>;

    /**
     * 回复图片
     * @param to 待回复消息
     * @param imageFile 图片文件路径
     * @param messageReplyMode 回复模式，默认使用配置值
     */
    replyImage(to: Message, imageFile: string, messageReplyMode?: MesageReplyMode): Promise<Result<Message>>;

    replyImageWithCache(to: Message, imageFile: string, dao: IServerImageDao, messageReplyMode?: MesageReplyMode): Promise<Result<Message>>

    sendImageWithCache(topic_id: string, imageFile: string, dao: IServerImageDao): Promise<Result<Message>>
    
}

/**
 * bot初始化选项
 */
export interface InitOptions {
    /**
     * 存储，默认为{@link FileStorage}
     */
    storage?: IBotStorage;
    /**
     * 回复器列表，回复器位置越前，优先级越高
     */
    repliers?: Replier[];
    /**
     * 回复器挑选函数
     * 
     * 内置实现参照 {@link Replier.pick01}（默认）, {@link Replier.pick} 
     */
    replierPickFunction?: ReplierPickFunction;
}

export interface ServerImageInfo {
    fileName: string;
    info: MediaImageInfo;
}

export interface IServerImageDao {

    findByFileName(fileName: string): Promise<ServerImageInfo | null>

    deleteByFileName(fileName: string): Promise<any>;

    insertOne(serverImage: ServerImageInfo): Promise<any>;
}
