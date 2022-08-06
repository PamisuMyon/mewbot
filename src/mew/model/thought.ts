import { CommonObjects, Reaction } from "./common.js";
import { Member } from "./node.js";

export interface Thoughts {
    objects: CommonObjects;
    entries: Thought[];
    memeber_info: Record<string, Partial<Member>>;
}

export interface Thought {
    media: any[];
    embeds: Embed[];
    mentions: any[];
    mention_roles: any[];
    post_media: string[];
    post_embeds: any[];
    last_reply: string;
    topic_id: string;
    node_id: string;
    author_id: string;
    status: string;
    post_content: string;
    post_cover?: string;
    quoted_thought_id?: any;
    created_at: string;
    edited_at?: string;
    sunk_by?: string;
    sunl_at?: string;
    id: string;
    preview?: Preview;
    like_count: number;
    comment_count: number;
    quote_count: number;
    reactions: Reaction[];
    liked: boolean;
    bookmarked: boolean;
    reply_messages: any[];
    objects: CommonObjects;
}

interface Preview {
    content: string;
    title: string;
}

/**
 * 发给服务端的想法结构
 */
export interface OutgoingThought {
    status: string;   // 想法内容
    post?: Post;       // 长文
}

// TODO 需要一个长文builder
export interface Post {
    content: string;  // 长文内容
    media: string[];     // 长文中媒体
    embeds: Embed[];    // 第三方链接解析
    cover: string;    // 封面
}

export interface Content {
    type: string | 'doc' | 'paragraph' | 'text';
    content?: Content[];
    text?: string;
    attrs?: Record<string, string>;
    version?: number;
}

export interface Embed {
    provider: string;
    url: string;
    title: string;
    description: string;
    content: string;
    color?: any;
    thumbnail: string;
    creator: string;
    width: number;
    height: number;
    id: string;
}

export interface Comments {
    objects: CommonObjects;
    entries: Comment[];
}

export interface Comment {
    mentions: string[];
    mention_roles: any[];
    thought_id: string;
    author_id: string;
    media?: string;
    content: string;
    mention_everyone: boolean;
    node_id: string;
    created_at: string;
    updated_at?: string;
    index: number;
    parent_id?: string;
    id: string;
    like_count: number;
    comment_count: number;
    reactions: any[];
    liked: boolean;
    objects?: CommonObjects;
}

/**
 * 发给服务端的评论结构
 */
export interface OutgoingComment {
    /**
     * 文本内容
     */
    content: string;
    /**
     * 图片
     */
    media?: string;
    /**
     * 要回复的评论id
     */
    parentId?: string;
}
