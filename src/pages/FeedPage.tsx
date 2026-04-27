import { useEffect, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { FeedItemCard } from '@/components/feed/FeedItemCard';
import { Button, Card, EmptyState, PageHeader } from '@/components/ui';
import { feedService } from '@/services/feedService';
import type { FeedCheersResponse, FeedItemResponse } from '@/types';

const FEED_PAGE_SIZE = 20;

const mergeById = (
  currentItems: FeedItemResponse[],
  incomingItems: FeedItemResponse[]
) => {
  const existingIds = new Set(currentItems.map((item) => item.id));
  const uniqueIncoming = incomingItems.filter((item) => !existingIds.has(item.id));

  return [...currentItems, ...uniqueIncoming];
};

export const FeedPage = () => {
  const [items, setItems] = useState<FeedItemResponse[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [cheersPendingIds, setCheersPendingIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadFeed = async () => {
      setIsInitialLoading(true);
      setError(null);

      try {
        const page = await feedService.getFeed({ limit: FEED_PAGE_SIZE });

        if (!isActive) {
          return;
        }

        setItems(page.items);
        setNextCursor(page.nextCursor);
        setHasMore(page.hasMore);
      } catch {
        if (!isActive) {
          return;
        }

        setError('The feed could not load. Please try again.');
      } finally {
        if (isActive) {
          setIsInitialLoading(false);
        }
      }
    };

    void loadFeed();

    return () => {
      isActive = false;
    };
  }, []);

  const handleRefresh = async () => {
    setIsInitialLoading(true);
    setError(null);

    try {
      const page = await feedService.getFeed({ limit: FEED_PAGE_SIZE });

      setItems(page.items);
      setNextCursor(page.nextCursor);
      setHasMore(page.hasMore);
    } catch {
      setError('The feed could not load. Please try again.');
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore || !nextCursor) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const page = await feedService.getFeed({
        cursor: nextCursor,
        limit: FEED_PAGE_SIZE
      });

      setItems((currentItems) => mergeById(currentItems, page.items));
      setNextCursor(page.nextCursor);
      setHasMore(page.hasMore);
    } catch {
      setError('More activity could not load right now.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const applyCheersState = (payload: FeedCheersResponse) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === payload.feedItemId
          ? {
              ...item,
              cheersCount: payload.cheersCount,
              cheeredByMe: payload.cheeredByMe
            }
          : item
      )
    );
  };

  const handleToggleCheers = async (item: FeedItemResponse) => {
    const isPending = cheersPendingIds.has(item.id);

    if (isPending) {
      return;
    }

    setCheersPendingIds((currentIds) => new Set(currentIds).add(item.id));

    try {
      const payload = item.cheeredByMe
        ? await feedService.uncheerFeedItem(item.id)
        : await feedService.cheerFeedItem(item.id);

      applyCheersState(payload);
    } catch {
      setError('Could not update cheers right now.');
    } finally {
      setCheersPendingIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(item.id);
        return nextIds;
      });
    }
  };

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Feed"
        title="Friends and fresh pours"
        description="Recent activity from your social circle, including the latest logged drinks."
      />

      <div className="flex justify-end">
        <Button
          disabled={isInitialLoading}
          onClick={() => void handleRefresh()}
          size="sm"
          variant="secondary"
        >
          <RefreshCcw className="size-4" />
          Refresh
        </Button>
      </div>

      {error && items.length === 0 ? (
        <EmptyState
          title="Feed unavailable"
          description={error}
          action={
            <Button
              onClick={() => void handleRefresh()}
              size="sm"
              variant="secondary"
            >
              Try again
            </Button>
          }
        />
      ) : null}

      {isInitialLoading ? (
        <div className="grid gap-3">
          {[0, 1, 2].map((item) => (
            <Card className="h-56 animate-pulse bg-[var(--color-surface-muted)]" key={item} />
          ))}
        </div>
      ) : null}

      {!isInitialLoading && items.length > 0 ? (
        <div className="grid gap-3">
          {items.map((item) => (
            <FeedItemCard
              isTogglingCheers={cheersPendingIds.has(item.id)}
              item={item}
              key={item.id}
              onToggleCheers={(targetItem) => void handleToggleCheers(targetItem)}
            />
          ))}
        </div>
      ) : null}

      {!isInitialLoading && items.length === 0 && !error ? (
        <EmptyState
          title="Nothing in the feed yet"
          description="As soon as public drink activity appears, it will show up here."
        />
      ) : null}

      {!isInitialLoading && hasMore ? (
        <div className="flex justify-center">
          <Button
            disabled={isLoadingMore}
            onClick={() => void handleLoadMore()}
            size="sm"
            variant="secondary"
          >
            {isLoadingMore ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      ) : null}

      {error && items.length > 0 ? (
        <p className="text-center text-xs text-[var(--color-muted)]">{error}</p>
      ) : null}
    </div>
  );
};
