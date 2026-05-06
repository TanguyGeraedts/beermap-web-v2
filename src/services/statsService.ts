import { apiClient } from '@/services/apiClient';
import type { StatsOverviewResponse } from '@/types';

export const statsService = {
  getMyOverview: async () => {
    const { data } = await apiClient.get<StatsOverviewResponse>('/stats/me');
    return data;
  }
};
