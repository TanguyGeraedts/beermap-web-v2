import { apiClient } from '@/services/apiClient';
import type { FeedCheersResponse, FeedPageResponse, GetFeedParams } from '@/types';

const DEFAULT_FEED_LIMIT = 20;

export const feedService = {
  getFeed: async (params: GetFeedParams = {}) => {
    const { cursor, limit = DEFAULT_FEED_LIMIT } = params;

    const { data } = await apiClient.get<FeedPageResponse>('/feed', {
      params: {
        cursor,
        limit
      }
    });

    return data;
  },

  cheerFeedItem: async (feedItemId: string) => {
    const { data } = await apiClient.post<FeedCheersResponse>(
      `/feed/${feedItemId}/cheers`
    );

    return data;
  },

  uncheerFeedItem: async (feedItemId: string) => {
    const { data } = await apiClient.delete<FeedCheersResponse>(
      `/feed/${feedItemId}/cheers`
    );

    return data;
  }
};
