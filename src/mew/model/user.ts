// 用户相关

import { CommonObjects } from "./common.js";

export interface Auth {
    token: string;
    id?: string;
    name?: string;
    username?: string;
}

export interface User {
    background: string;     // 资料背景
    id: string;
    username: string;       // 账号
    name: string;           // 昵称
    avatar: string;         // 头像
    description: string;    // 描述
    profile: string;        // '{platforms:[{platform:steam,server:CN,name:xx,gameId:xxx}]}'    
    created_at: string;     // 账号创建时间
    description_updated_at: string;     // 资料更新时间
    silence_to: any;
    protected: boolean;
    can_dm: boolean;
    type: number;
    follower_count: number;
    following_count: number;
    objects: CommonObjects;
}

