import { useQuery } from '@tanstack/react-query';
import { statsService } from '@/services/statsService';
import type { MeStatsResponse } from '@/types';

export const useMeStats = () => {
    return useQuery<MeStatsResponse>({
        queryKey: ['stats', 'me'],
        queryFn: () => statsService.getMeStats(),
        staleTime: 1000 * 60 * 5,
    });
};