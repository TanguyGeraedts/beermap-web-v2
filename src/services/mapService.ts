import { apiClient } from './apiClient';
import type { DrinkLogPin } from '@/types/map';

interface DrinkLogResponse {
    id: string;
    displayName: string;
    category: string;
    subType?: string;
    abvPercent?: number;
    consumedAt: string;
    quantity: number;
    volumeMl?: number;
    rating?: number;
    description?: string;
    photoUrl?: string;
    latitude?: number;
    longitude?: number;
}

interface Page<T> {
    content: T[];
    totalPages: number;
    number: number;
}


export async function fetchMapPins(): Promise<DrinkLogPin[]> {
    const pins: DrinkLogPin[] = [];
    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
        const { data } = await apiClient.get<Page<DrinkLogResponse>>('/drink-logs/me', {
            params: { page, size: 100, sort: 'consumption.consumedAt,desc' },
        });

        totalPages = data.totalPages;

        for (const log of data.content) {
            if (log.latitude != null && log.longitude != null) {
                pins.push({
                    id: log.id,
                    displayName: log.displayName,
                    category: log.category,
                    subType: log.subType,
                    abvPercent: log.abvPercent,
                    consumedAt: log.consumedAt,
                    quantity: log.quantity,
                    volumeMl: log.volumeMl,
                    rating: log.rating,
                    description: log.description,
                    photoUrl: log.photoUrl,
                    latitude: log.latitude,
                    longitude: log.longitude,
                });
            }
        }

        page++;
    }

    return pins;
}