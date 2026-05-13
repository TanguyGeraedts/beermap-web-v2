import { useInfiniteQuery } from '@tanstack/react-query';
import { feedService } from '@/services/feedService';
import type { FeedPage } from '@/types/feed';

export function useFeed() {
    return useInfiniteQuery<FeedPage>({
        queryKey: ['feed'],
        queryFn: ({ pageParam }) =>
            feedService.getFeed(pageParam as string | undefined),
        getNextPageParam: (lastPage) =>
            lastPage.hasMore ? lastPage.nextCursor : undefined,
        initialPageParam: undefined,
        staleTime: 1000 * 30,
    });
}