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
     * 回复，所有replyXXX方法将会处理回复模式、添加@对方 等等
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

    /**
     * 回复图片，利用以存储的服务端图片信息，可在发送已发过的图片时，直接使用服务端图片ID，而无需重复上传图片
     * @param to 待回复消息
     * @param imageFile 图片文件路径
     * @param dao 服务端图片信息存储实现，没有默认实现，请按自己的口味实现一个。MongoDB示例：[server-image.ts](https://github.com/PamisuMyon/nanabot/blob/main/src/models/server-image.ts)
     * @param messageReplyMode 
     */
    replyImageWithCache(to: Message, imageFile: string, dao: IServerImageDao, messageReplyMode?: MesageReplyMode): Promise<Result<Message>>

    /**
     * 上面那个方法的直接发送版，无需指定回复哪条消息
     * @param topic_id 话题/节点ID，私聊ID
     * @param imageFile 图片文件路径
     * @param dao 服务端图片信息存储实现
     */
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

/**
 * 服务端图片信息，利用此信息可在下一次发送同一张图片时，直接使用服务端图片ID，而无需重复上传图片
 */
export interface ServerImageInfo {
    /**
     * 文件名
     */
    fileName: string;
    /**
     * 服务端图片信息
     */
    info: MediaImageInfo;
}

/**
 * 服务端图片信息存储接口
 */
export interface IServerImageDao {

    findByFileName(fileName: string): Promise<ServerImageInfo | null>

    deleteByFileName(fileName: string): Promise<any>;

    insertOne(serverImage: ServerImageInfo): Promise<any>;
}
