import { useQuery } from '@tanstack/react-query';
import { fetchMapPins } from '@/services/mapService';
import type { DrinkLogPin } from '@/types/map';

export function useMapPins() {
    return useQuery<DrinkLogPin[]>({
        queryKey: ['map', 'pins'],
        queryFn: fetchMapPins,
        staleTime: 1000 * 60 * 5,
    });
}