import { MeResponse } from "./auth";

export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Friendship {
    id: string;
    requesterId: string;
    addresseeId: string;
    status: FriendshipStatus;
    createdAt: string;
    user?: MeResponse;
}

export interface SendFriendRequest {
    targetUsername: string;
    targetDiscriminator: string;
}

export interface AcceptFriendRequest {
    userId: string;
}