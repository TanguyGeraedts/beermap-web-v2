import { useEffect, useRef } from 'react';
import { RefreshCw, Rss, AlertCircle } from 'lucide-react';
import { useFeed } from '@/hooks/useFeed';
import { FeedItem } from '@/components/feed/FeedItem';

export const FeedPage = () => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useFeed();
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage(); },
            { threshold: 0.1 }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const items = data?.pages.flatMap((p) => p.items) ?? [];

    return (
        <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Rss size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Feed</h1>
                </div>
                <button
                    onClick={() => refetch()}
                    className="p-2 rounded-xl transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                >
                    <RefreshCw size={16} />
                </button>
            </div>

            {/* Loading skeleton */}
            {isLoading && (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-4 h-28 animate-pulse"
                            style={{ background: 'var(--color-surface)' }}
                        />
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <div
                    className="flex items-center gap-2 p-4 rounded-2xl"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: '#ef4444' }}
                >
                    <AlertCircle size={16} />
                    <span className="text-sm">Failed to load feed</span>
                    <button onClick={() => refetch()} className="ml-auto text-xs underline opacity-75">Retry</button>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && items.length === 0 && (
                <div className="text-center py-16 space-y-2">
                    <p className="text-4xl">🍺</p>
                    <p className="font-semibold" style={{ color: 'var(--color-text)' }}>Nothing here yet</p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Add some friends to see their activity</p>
                </div>
            )}

            {/* Feed items */}
            {items.map((item) => (
                <FeedItem key={item.id} item={item} />
            ))}

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="h-4" />

            {/* Load more spinner */}
            {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                    <RefreshCw size={18} className="animate-spin" style={{ color: 'var(--color-muted)' }} />
                </div>
            )}

            {/* End of feed */}
            {!hasNextPage && items.length > 0 && (
                <p className="text-center text-xs py-4" style={{ color: 'var(--color-muted)' }}>
                    You're all caught up 🍻
                </p>
            )}
        </div>
    );
};