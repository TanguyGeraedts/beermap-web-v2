import { apiClient } from './apiClient';
import type { MapPin, MapPinsParams } from '@/types/map';

export async function fetchMapPins(params: MapPinsParams): Promise<MapPin[]> {
    const { data } = await apiClient.get<MapPin[]>('/map/pins', {
        params: {
            mode:       params.mode ?? 'MINE',
            categories: params.categories?.join(','),
            from:       params.from,
            to:         params.to,
            minLat:     params.minLat,
            minLon:     params.minLon,
            maxLat:     params.maxLat,
            maxLon:     params.maxLon,
            limit:      params.limit ?? 500,
        },
    });

    return data;
}