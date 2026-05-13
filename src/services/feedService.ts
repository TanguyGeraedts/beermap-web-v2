import { apiClient } from './apiClient';
import type { FeedPage, FeedCheersResponse } from '@/types/feed';

export const feedService = {
    getFeed: async (cursor?: string, limit = 20): Promise<FeedPage> => {
        const { data } = await apiClient.get<FeedPage>('/feed', {
            params: { ...(cursor ? { cursor } : {}), limit },
        });
        return data;
    },

    cheer: async (feedItemId: string): Promise<FeedCheersResponse> => {
        const { data } = await apiClient.post<FeedCheersResponse>(`/feed/${feedItemId}/cheers`);
        return data;
    },

    uncheer: async (feedItemId: string): Promise<FeedCheersResponse> => {
        const { data } = await apiClient.delete<FeedCheersResponse>(`/feed/${feedItemId}/cheers`);
        return data;
    },
};