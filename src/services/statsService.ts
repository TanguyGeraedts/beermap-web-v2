import { apiClient } from '@/services/apiClient';
import type { MeStatsResponse } from '@/types';

export const statsService = {
    getMeStats: async (): Promise<MeStatsResponse> => {
        const { data } = await apiClient.get<MeStatsResponse>('/stats/me');
        return data;
    },
};