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
    name: string;
    size: string;
    color: string;
    customize: boolean;
}
