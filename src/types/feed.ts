export type FeedItemType =
  | 'DRINK_LOG_CREATED'
  | 'BADGE_UNLOCKED'
  | 'FRIEND_ADDED'
  | 'SESSION_STARTED'
  | 'SESSION_COMPLETED';

export type FeedTargetType = 'DRINK_LOG' | 'BADGE' | 'FRIENDSHIP' | 'SESSION';

export type FeedVisibility = 'PUBLIC' | 'FRIENDS' | 'PRIVATE';

export interface FeedActorResponse {
  id: string;
  username: string;
  discriminator: string | null;
  avatarUrl: string | null;
}

export interface FeedDrinkLogDetailsResponse {
  id: string;
  displayName: string;
  category: string;
  subType: string;
  quantity: number | null;
  rating: number | null;
  photoUrl: string | null;
  consumedAt: string;
}

export interface FeedItemDetailsResponse {
  actor: FeedActorResponse | null;
  drinkLog: FeedDrinkLogDetailsResponse | null;
}

export interface FeedItemResponse {
  id: string;
  userId: string;
  type: FeedItemType;
  targetType: FeedTargetType;
  targetId: string;
  visibility: FeedVisibility;
  metadataJson: string | null;
  createdAt: string;
  cheersCount: number;
  cheeredByMe: boolean;
  details: FeedItemDetailsResponse | null;
}

export interface FeedPageResponse {
  items: FeedItemResponse[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface GetFeedParams {
  cursor?: string;
  limit?: number;
}

export interface FeedCheersResponse {
  feedItemId: string;
  cheersCount: number;
  cheeredByMe: boolean;
}
