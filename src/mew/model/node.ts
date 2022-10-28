// 据点相关

import { CommonObjects } from "./common.js";
import { Message } from "./message.js";

export interface Node {
    mod_message_author?: any;
    mod_message_date?: any;
    searchable: boolean;
    enable_join_question: boolean;
    enable_speak_question: boolean;
    manage_tutorial_flags: number;
    tags: string[];
    map_size: number;
    node_name: string;
    name: string;
    icon: string;
    super_moderator: string;
    mod_message: string;
    pinned_thought?: any;
    created_at: string;
    updated_at: string;
    description: string;
    sector_id: string;
    sector_order: number;
    mew_code: string;
    node_type: number;
    view_mode?: any;
    id: string;
    pin_unread: boolean;
    latest_topic?: any;
    hottest_topic?: any;
    join_questions: Joinquestion[];
    speak_questions: any[];
    topics?: Topic[];       // 获取未加入的据点信息时，无法获取到话题信息
    roles: Role[];
    member_count: number;
    thought_count: number;
    objects: CommonObjects;
    blocked: boolean;
    moderation_topic_id?: any;
    last_visit?: any;
    mods: Mod[];
}

export interface Mod {
    id: string;
    level: number;
    max_level: number;
    mod_name: string;
    upgradable: boolean;
}

export interface Role {
    node_id: string;
    type: string;
    name: string;
    color: number;
    permissions: number;
    position: number;
    hoist: boolean;
    id: string;
    updated_at?: string;
}

export interface Joinquestion {
    node_id: string;
    type: number;
    operator_id: string;
    content: string;
    created_at: string;
    updated_at?: any;
    id: string;
}

export interface Topic {
    type: string;
    media: string[];
    node_id: string;
    name: string;
    description?: string;
    position: number;
    archived: boolean;
    permission_overwrites: any[];
    creator: string;
    created_at: string;
    updated_at: string;
    icon: Icon;
    id: string;
    speaker_size: number;
    recent_speakers: any[];
    last_messages: Message[];
    unread: boolean;
    unread_count: number;
    ack?: any;
    deployed: boolean;
    last_active_at: string;
    space_position: Vector3;
    message_count: number;
    thought_count: number;
}

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Icon {
    /**
     * 名称
     */
    name: string;
    /**
     * 大小 `S` `M` `L`
     */
    size: string;
    /**
     * 颜色
     */
    color: string;
    customize: boolean;
}

export interface Member {
    roles: string[];
    is_super_moderator: boolean;
    is_moderator: boolean;
    is_verified: boolean;
    last_active_time?: string;
    node_push_mode: string;
    custom_push_setting: any;
    nick: any;
    permissions_allow: number;
    permissions_deny: number;
    joined_at: string;
    updated_at: string;
    pinned_at: string;
    node_id: string;
    user_id: string;
    objects?: CommonObjects;
}

/**
 * 发给服务端的据点信息结构
 */
export interface OutgoingNode {
    /**
     * 据点名称
     */
    name?: string;
    /**
     * 据点描述
     */
    description?: string;
    /**
     * 标签
     */
    tags?: string[];
    /**
     * 外观
     */
    appearance?: {
        /**
         * 头像
         */
        icon?: string;
        /**
         * 背景
         */
        banner?: string;
    };
}

/**
 * 权限Flag
 */
export enum PermissionFlag {
    /**
     * 参与讨论
     */
    Speak = 1 << 4,
    /**
     * 发表想法
     */
    Thought = 1 << 5,
    /**
     * 发表评论
     */
    Comment = 1 << 6,
}

/**
 * 发给服务端的话题/节点信息结构
 */
export interface OutgoingTopic {
    /**
     * 名称
     */
    name: string;
    /**
     * 图标
     */
    icon?: Icon;
}
