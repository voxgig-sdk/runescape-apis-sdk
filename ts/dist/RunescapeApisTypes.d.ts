export interface GrandExchangeDatabase {
    average?: Record<string, any>;
    current?: Record<string, any>;
    daily?: Record<string, any>;
    day180?: Record<string, any>;
    day30?: Record<string, any>;
    day90?: Record<string, any>;
    description?: string;
    icon?: string;
    icon_large?: string;
    id?: number;
    items?: number;
    lastConfigUpdateRuneday?: number;
    letter?: string;
    members?: string;
    name?: string;
    today?: Record<string, any>;
    type?: string;
    typeIcon?: string;
}
export interface GrandExchangeDatabaseLoadMatch {
    item_id: number;
}
export interface GrandExchangeDatabaseListMatch {
    alpha?: string;
    category: number;
    page?: number;
}
export interface OldSchoolGrandExchange {
    current?: Record<string, any>;
    description?: string;
    icon?: string;
    icon_large?: string;
    id?: number;
    members?: string;
    name?: string;
    today?: Record<string, any>;
    type?: string;
    typeIcon?: string;
}
export interface OldSchoolGrandExchangeListMatch {
    alpha: string;
    category: number;
    page: number;
}
export interface PlayerRanking {
    name?: string;
    rank?: string;
    score?: string;
}
export interface PlayerRankingListMatch {
    category: number;
    size: number;
    table: number;
}
