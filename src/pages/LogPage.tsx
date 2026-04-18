import { EmptyState, PageHeader } from '../shared/ui';

export const LogPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Log"
        title="Log a drink."
        description="This will become the mobile-first drink logging flow."
      />
      <EmptyState
        title="No form yet"
        description="The next vertical slice can bring over catalog search, quantity, rating, and location."
      />
    </div>
  );
};
