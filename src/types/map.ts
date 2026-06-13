import type { AccountType } from './auth';

export type MapMode = 'MINE' | 'FRIENDS' | 'GLOBAL';

export interface UserSummary {
    id: string;
    username: string;
    discriminator: string;
    avatarUrl?: string;
    accountType: AccountType;
}

export interface MapPin {
    logId: string;
    latitude: number;
    longitude: number;
    category: string;
    displayName: string;
    subType?: string;
    userSummary: UserSummary;
    rating?: number;
    photoUrl?: string;
    consumedAt: string;
}

export interface MapPinsParams {
    mode?: MapMode;
    categories?: string[];
    from?: string;
    to?: string;
    minLat: number;
    minLon: number;
    maxLat: number;
    maxLon: number;
    limit?: number;
}