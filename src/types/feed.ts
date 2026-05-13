import {Visibility} from "@/types/visibility.ts";
import {AccountType} from "@/types/auth.ts";

export type FeedItemType =
    | 'DRINK_LOG_CREATED'
    | 'BADGE_UNLOCKED'
    | 'FRIEND_ADDED'
    | 'SESSION_STARTED'
    | 'SESSION_COMPLETED';

export type FeedTargetType = 'DRINK_LOG' | 'BADGE' | 'FRIENDSHIP' | 'SESSION';

export interface FeedActor {
    id: string;
    username: string;
    discriminator: string;
    avatarUrl?: string;
    accountType:  AccountType;
}

export interface FeedDrinkLogDetails {
    id: string;
    displayName: string;
    category: string;
    subType?: string;
    quantity?: number;
    rating?: number;
    photoUrl?: string;
    consumedAt: string;
}

export interface FeedItemDetails {
    actor: FeedActor;
    drinkLog?: FeedDrinkLogDetails;
}

export interface FeedItem {
    id: string;
    userId: string;
    type: FeedItemType;
    targetType: FeedTargetType;
    targetId: string;
    visibility: Visibility;
    createdAt: string;
    cheersCount: number;
    cheeredByMe: boolean;
    details: FeedItemDetails;
}

export interface FeedPage {
    items: FeedItem[];
    nextCursor?: string;
    hasMore: boolean;
}

export interface FeedCheersResponse {
    feedItemId: string;
    cheersCount: number;
    cheeredByMe: boolean;
}