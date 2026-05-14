export interface LogDrinkRequest {
    catalogItemId?: string;
    customDrinkName?: string;
    category?: string;
    subType?: string;
    consumedAt?: string;
    quantity?: number;
    volumeMl?: number;
    abvPercent?: number;
    rating?: number;
    description?: string;
    photoUrl?: string;
    latitude?: number;
    longitude?: number;
}

export interface UpdateDrinkLogRequest {
    catalogItemId?: string;
    customDrinkName?: string;
    category?: string;
    subType?: string;
    consumedAt?: string;
    quantity?: number;
    volumeMl?: number;
    abvPercent?: number;
    rating?: number;
    description?: string;
    photoUrl?: string;
    latitude?: number;
    longitude?: number;
}

export interface DrinkLogResponse {
    id: string;
    userId: string;
    catalogItemId?: string;
    customDrinkName?: string;
    category: string;
    subType?: string;
    displayName: string;
    consumedAt: string;
    quantity: number;
    volumeMl?: number;
    abvPercent?: number;
    rating?: number;
    description?: string;
    photoUrl?: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
}

export interface DrinkLogTimeline {
    content: DrinkLogResponse[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
}