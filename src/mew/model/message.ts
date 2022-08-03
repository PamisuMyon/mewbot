// 消息相关

import { CommonObjects } from "./common.js";
import { Embed } from "./thought.js";
import { Member, User } from "./user.js";


// #region From server

/**
 * 通过HTTP接口获取到的消息数据
 */
export interface Message {
    attachments: string[];
    media: string[];
    embeds: string[];
    mentions: string[];
    mention_roles: string[];
    node_id?: string;
    topic_id: string;
    author_id: string;
    type: number;
    content?: string;
    thought?: any;
    mention_everyone: boolean;
    parent?: any;
    nonce: string;
    stamp?: string;
    created_at: string;
    edited_at?: string;
    id: string;
    objects?: CommonObjects;
    reactions?: any[];
    // ---经过处理后添加的额外字段---
    /**
     * 额外添加字段：用户信息
     */
    _user?: User;
    /**
     * 额外添加字段：媒体信息
     */
    _media?: Media[];
    /**
     * 额外添加字段：是否为私聊消息
     */
    _isDirect?: boolean;
}

export interface TopicMessageResult {
    objects: CommonObjects;
    entries: Message[];
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

// #endregion From server

// #region Websocket dispatch

export enum DispatchEvent {
    UserTyping = 'user_typing',
    MessageCreate = 'message_create',
    MessageDelete = 'message_delete',
    MessageEngagement = 'message_engagement',
    ThoughtEngagement = 'thought_engagement',
    CommentEngagement = 'comment_engagement',
    NodeMemberAdd = 'node_member_add',
    // ---暂未处理---
    NodeMemberActivityChange = 'node_member_activity_change',
    // TODO 据点成员退出 想法删除 其他
}

export interface Dispatch {
    event: DispatchEvent;
    data: UserTypingData | MessageCreateData | MessageDeleteData | MessageEngagementData | ThoughtEngagementData | CommentEngagementData | NodeMemberAddData;
}

export interface UserTypingData {
    node_id: string;      // 据点id
    topic_id: string;     // 话题/节点id
    user_id: string;      // 用户id
    user: User;           // 用户信息
    member: Member;       // 用户在据点中的成员信息
}

/**
 * 通过WebSocket接收的消息创建数据
 */
export interface MessageCreateData {
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
    thought: string;      
    attachments?: any[];
    embeds?: Embed[];
    mentions?: string[];
    mention_roles?: any[];
    mention_everyone: boolean;
    type: number;
    parent?: any;
    nonce?: string;
    profile_card?: any;
    created_at: string,
    edited_at?: string,
    objects: CommonObjects;
    // ---经过处理后添加的额外字段---
    /**
     * 额外添加字段：用户信息
     */
     _user?: User;
     /**
      * 额外添加字段：媒体信息
      */
     _media?: Media[];
     /**
      * 额外添加字段：是否为私聊消息
      */
     _isDirect?: boolean;
}

export type MessageDeleteData = Message

export function refine(data: MessageCreateData | Message) {
    if (!data.objects) return;
    if (data.objects.users) {
        for (const key in data.objects.users) {
            data._user = data.objects.users[key];
            break;
        }
    }
    if (data.objects.media) {
        data._media = new Array<Media>();
        for (const key in data.objects.media) {
            const media = data.objects.media[key];
            media._id = key;
            if (data.media.indexOf(key) != -1)
                data._media.push(media);
        }
    }
    data._isDirect = !data.node_id;     // 没有node_id则为私聊消息
}

export interface Media {
    type: string;
    url: string;
    _id?: string;
}


export interface ThoughtEngagementData {
    thought_id: string;
    user_id: string;
    stamp_id: string;
    count: number;
    type: number;
}

export interface MessageEngagementData {
    topic_id: string;
    message_id: string;
    user_id: string;
    stamp_id: string;
    count: number;
    type: number;
}

export interface CommentEngagementData {
    comment_id: string;
    user_id: string;
    stamp_id: string;
    count: number;
    type: number;
}

export interface NodeMemberAddData {
    roles: string[];
    is_super_moderator: boolean;
    is_moderator: boolean;
    is_verified: boolean;
    node_push_mode: string;
    custom_push_setting: any;
    nick: string;
    permissions_allow: number;
    permissions_deny: number;
    joined_at: string;
    updated_at: string;
    node_id: string;
    user_id: string;
}

// #endregion Websocket dispatch

// #region To server

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
}

// #endregion To server
