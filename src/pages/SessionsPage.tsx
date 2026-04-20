import { EmptyState, PageHeader } from '../shared/ui';

export const SessionsPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Sessions"
        title="Session tracking."
        description="Start, complete, and review grouped drink sessions from this tab."
      />
      <EmptyState
        title="No active session"
        description="The old session flow can be migrated here when the core API hooks are ready."
      />
    </div>
  );
};
