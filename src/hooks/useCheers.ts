import { useMutation, useQueryClient } from '@tanstack/react-query';
import { feedService } from '@/services/feedService';
import type { FeedPage } from '@/types/feed';

export function useCheers() {
    const queryClient = useQueryClient();

    const updateCache = (feedItemId: string, cheeredByMe: boolean, delta: number) => {
        queryClient.setQueriesData<{ pages: FeedPage[] }>(
            { queryKey: ['feed'] },
            (old) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page.items.map((item) =>
                            item.id === feedItemId
                                ? { ...item, cheeredByMe, cheersCount: item.cheersCount + delta }
                                : item
                        ),
                    })),
                };
            }
        );
    };

    const cheer = useMutation({
        mutationFn: (feedItemId: string) => feedService.cheer(feedItemId),
        onMutate: (feedItemId) => updateCache(feedItemId, true, +1),
        onError: (_err, feedItemId) => updateCache(feedItemId, false, -1),
    });

    const uncheer = useMutation({
        mutationFn: (feedItemId: string) => feedService.uncheer(feedItemId),
        onMutate: (feedItemId) => updateCache(feedItemId, false, -1),
        onError: (_err, feedItemId) => updateCache(feedItemId, true, +1),
    });

    return { cheer, uncheer };
}