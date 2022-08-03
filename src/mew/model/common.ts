import { Media } from "./message.js";
import { Member, User } from "./user.js";

/**
 * 通用的API返回数据类型，用来统一服务端返回值
 * 服务端返回正确结果，则data有值
 * 服务端返回错误结果，则error有值
 */
export interface Result<T> {
    data?: T;
    error?: ErrorBody,
}

export interface CommonObjects {
    media?: Record<string, Media>;
    users?: Record<string, User>;
    members?: Record<string, Member>;
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
