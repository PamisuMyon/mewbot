import { CommonObjects, Reaction } from "./common.js";
import { Member } from "./user.js";

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
    sunk_by?: any;
    id: string;
    preview?: Preview;
    like_count: number;
    comment_count: number;
    quote_count: number;
    reactions: Reaction[];
    liked: boolean;
    bookmarked: boolean;
    objects: CommonObjects;

}

interface Preview {
    content: string;
    title: string;
}

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

/*
{
    "provider": "网易云音乐",
    "url": "https://music.163.com/song?id=431855302",
    "title": "God Bless You",
    "description": "歌曲名《God Bless You》，别名《TVアニメ「マクロスΔ(デルタ)」EDSP放映テーマ》，由 鈴木みのり 演唱，收录于《Walküre Trap!》专辑中",
    "content": "歌曲名《God Bless You》，别名《TVアニメ「マクロスΔ(デルタ)」EDSP放映テーマ》，由 鈴木みのり 演唱，收录于《Walküre Trap!》专辑中",
    "color": null,
    "thumbnail": "https://image.mew.fun/tos-cn-i-c226mjqywu/6ac0b8cd91e6695ff30aa92a52e02f17.jpg",
    "creator": "98695106398476262",
    "width": 500,
    "height": 500,
    "id": "220849053670215680"
}
*/

/*
{
    "provider": "Bilibili",
    "url": "https://www.bilibili.com/video/BV1pW411J7s8",
    "title": "【官方双语】形象展示傅里叶变换",
    "description": "动态地认识傅里叶变换：把图像盘绕在圆上。\n\n更多信息请看下方评论\n\n翻译：Solara570、蛋卷  校对：ZSC  时间轴&后期：渡鸦\nBut what is the Fourier Transform? A visual introduction.\nhttps://youtu.be/spUNpyF58BY",
    "content": "动态地认识傅里叶变换：把图像盘绕在圆上。\n\n更多信息请看下方评论\n\n翻译：Solara570、蛋卷  校对：ZSC  时间轴&后期：渡鸦\nBut what is the Fourier Transform? A visual introduction.\nhttps://youtu.be/spUNpyF58BY",
    "color": null,
    "thumbnail": "https://image.mew.fun/tos-cn-i-c226mjqywu/c47eabe632482471f4f55aecf1555812.jpg",
    "creator": "98695106398476262",
    "width": 1920,
    "height": 1200,
    "id": "220851890173440000"
}
*/

export interface Comments {
    objects: CommonObjects;
    entries: Comment[];
}

export interface Comment {
    mentions: string[];
    mention_roles: any[];
    thought_id: string;
    author_id: string;
    media: string;
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
}

export interface OutgoingComment {
    content: string;      // 文本内容
    media?: string;       // 图片
    parentId?: string;   // 要回复的评论id
}
