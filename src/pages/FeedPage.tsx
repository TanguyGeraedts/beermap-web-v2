import { EmptyState, PageHeader } from '@/components/ui';

export const FeedPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Feed"
        title="Friends and fresh pours."
        description="A social feed can surface friends, nearby activity, and recent drinks."
      />
      <EmptyState
        title="Nothing in the feed"
        description="Friend activity can move here after profiles and friendships are wired up."
      />
    </div>
  );
};
