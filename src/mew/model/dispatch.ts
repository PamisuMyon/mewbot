import { CommonObjects } from "./common.js";
import { Message } from "./message.js";
import { Member } from "./node.js";
import { Comment, Thought } from "./thought.js";
import { User } from "./user.js";

export enum DispatchEvent {
    UserTyping = 'user_typing',
    MessageCreate = 'message_create',
    MessageDelete = 'message_delete',
    MessageEngagement = 'message_engagement',
    ThoughtCreate = 'thought_create',
    ThoughtEngagement = 'thought_engagement',
    CommentCreate = 'comment_create',
    CommentEngagement = 'comment_engagement',
    NodeMemberAdd = 'node_member_add',
    NodeMemberRemove = 'node_member_remove',
    NodeMemberBan = 'node_member_ban',
    NodeMemberActivityChange = 'node_member_activity_change',
}

export interface Dispatch {
    event: DispatchEvent;
    data: UserTyping | Message | Thought | Comment | Engagement | Member | NodeMemberActivityChange;
}

export interface UserTyping {
    node_id: string;      // 据点id
    topic_id: string;     // 话题/节点id
    user_id: string;      // 用户id
    user: User;           // 用户信息
    member: Member;       // 用户在据点中的成员信息
}

export function refine(data: Message) {
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

/**
 * 消息、想法、评论情绪变化
 */
export interface Engagement {
    topic_id?: string;
    message_id?: string;
    thought_id?: string;
    comment_id?: string;
    user_id: string;
    /**
     * 情绪id
     */
    stamp_id: string;
    /**
     * 数量
     */
    count: number;
    /**
     * `1`增加 `-1`减少 
     */
    type: number;
}

export interface NodeMemberActivityChange {
    objects: CommonObjects;
    entries: User[];
    memeber_info: Record<string, Partial<Member>>;
}
