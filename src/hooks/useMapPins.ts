import { useQuery } from '@tanstack/react-query';
import { fetchMapPins } from '@/services/mapService';
import type { MapPin, MapPinsParams } from '@/types/map';

export function useMapPins(params: MapPinsParams) {
    return useQuery<MapPin[]>({
        queryKey: ['map', 'pins', params],
        queryFn: () => fetchMapPins(params),
        staleTime: 1000 * 60 * 2,
        enabled:
            params.minLat !== params.maxLat &&
            params.minLon !== params.maxLon,
    });
}