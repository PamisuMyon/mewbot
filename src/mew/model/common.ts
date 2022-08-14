import { Media } from "./dispatch.js";
import { Member, Topic } from "./node.js";
import { Thought } from "./thought.js";
import { User } from "./user.js";

/**
 * 通用的API返回数据类型，用来统一服务端返回值
 */
export interface Result<T> {
    /**
     * 数据，服务端返回正确结果时有值
     */
    data?: T;
    /**
     * 错误，服务端返回错误结果时有值
     */
    error?: ErrorBody,
}

/**
 * 通用的`objects`字段类型
 */
export interface CommonObjects {
    media?: Record<string, Media>;
    users?: Record<string, User>;
    members?: Record<string, Member>;
    thoughts?: Record<string, Thought>;
    topics?: Record<string, Topic>;
}

/**
 * 通用的Entries数据类型
 */
export interface ObjectEntries<T> {
    objects: CommonObjects;
    entries: T[];
    next_cursor?: string;
    prev_cursor?: string;
}

export interface ErrorBody {
    message?: string;
    status?: number;
    code?: number;
    name: string;
}

export interface Stamps {
    stamps: Stamp[];
}

export interface Stamp {
    sticker_name: string;
    type: string;
    volc_type: number;
    url: string;
    thumbnail: string;
    primary_color: string;
    total_bytes: number;
    width: number;
    height: number;
    id: string;
}

export interface Reaction {
  count: number;
  created_at: string;
  stamp: string;
  me: boolean;
}
