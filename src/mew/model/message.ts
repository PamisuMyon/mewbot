// 消息相关

import { CommonObjects } from "./common.js";
import { Media } from "./dispatch.js";
import { Embed } from "./thought.js";
import { User } from "./user.js";


// #region From server

/**
 * 消息
 */
export interface Message {
    /**
     * 消息id
     */
    id: string;
    /**
     * 作者id
     */
    author_id: string;
    /**
     * 据点id
     */
    node_id: string;
    /**
     * 话题/节点id
     */
    topic_id: string;
    /**
     * 文本内容
     */
    content?: string;
    /**
     * 表情
     */
    stamp?: string;
    /**
     * 媒体id
     */
    media: string[];
    /**
     * 想法id
     */
    thought?: string;
    thread?: any;
    attachments?: any[];
    embeds?: Embed[];
    mentions?: string[];
    mention_roles?: any[];
    mention_everyone: boolean;
    type: number;
    parent?: any;
    nonce?: string;
    profile_card?: any;
    created_at: string;
    edited_at?: string;
    triggered_thought?: any;
    first_be_replied?: any;
    /**
     * 回复消息id
     */
    reply_to_message_id?: string;
    /**
     * 衍生话题根消息id
     */
    root_message_id?: string;
    /**
     * 情绪
     */
    reactions?: any[];
    objects: CommonObjects;
    // ---经过处理后添加的额外字段---
    /**
     * 额外添加字段：作者的用户信息，来源于`objects`字段，与`author_id`用户一致
     */
    _author: User;
    /**
     * 额外添加字段：其他相关联的用户信息，来源于`objects`字段，不含作者
     */
    _otherUsers: User[];
    /**
     * 额外添加字段：消息正文中包含的媒体信息，来源于`objects`字段
     */
    _media: Media[];
    /**
     * 额外添加字段：是否为私聊消息，通过`node_id`是否为空判断
     */
    _isDirect: boolean;
}

export interface STSToken {
    current_time: number;
    expired_time: number;
    session_token: string;
    access_key_id: string;
    secret_access_key: string;
}

export interface MediaImageInfo {
    type: string;  // image/png
    volc_type: number;
    url: string;
    thumbnail: string;
    primary_color: string;
    total_bytes: number;
    width: number;
    height: number;
    frames: number;
    created_at: string;
    updated_at?: string;
    id: string;
}

/**
 * 私聊会话信息
 */
export interface Direct {
    type: string;
    recipients: string[];
    media: string[];
    created_at: string;
    updated_at?: string;
    /**
     * 等同于话题/节点的`topic_id`，使用此id来向私聊发送消息
     */
    id: string;
    last_messages: Message[];
    objects: CommonObjects;
    unread?: false;
    unread_count?: number;
    acl?: string;
}

// #endregion From server

// #region To server

/**
 * 发给服务端的消息结构
 */
export interface OutgoingMessage {
    /**
     * nonce，使用发送消息相关接口时，将自动填充
     */
    nonce?: string;
    /**
     * 文本内容
     */
    content?: string;
    /**
     * 媒体内容，其中为媒体id
     */
    media?: string[];
    /**
     * 表情贴纸id
     */
    stamp?: string;
    /**
     * 类型
     */
    type?: number;
    /**
     * 要转发的想法id
     */
    thought?: string;
    /**
     * 要回复的消息id
     */
    replyToMessageId?: string;
}

// #endregion To server
