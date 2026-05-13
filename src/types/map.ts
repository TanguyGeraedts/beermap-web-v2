export type MapPinFilter = 'all' | 'friends' | 'private';

export interface DrinkLogPin {
    id: string;
    displayName: string;
    category: string;
    subType?: string;
    abvPercent?: number;
    consumedAt: string;       // ISO string
    quantity: number;
    volumeMl?: number;
    rating?: number;
    description?: string;
    photoUrl?: string;
    latitude: number;
    longitude: number;
}

