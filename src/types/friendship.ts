export type FriendshipStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'REMOVED' | 'BLOCKED';

export interface FriendSummary {
    id: string;
    username: string;
    discriminator: string;
    avatarUrl?: string;
}

export interface Friendship {
    id: string;
    requesterId: string;
    addresseeId: string;
    status: FriendshipStatus;
    createdAt: string;
    friend?: FriendSummary; 
}

export interface SendFriendRequest {
    targetUsername: string;
    targetDiscriminator: string;
}

export interface AcceptFriendRequest {
    userId: string;
}