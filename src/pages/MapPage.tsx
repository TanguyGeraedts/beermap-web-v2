import { EmptyState, PageHeader } from '../shared/ui';

export const MapPage = () => {
  return (
    <div className="min-h-dvh bg-[var(--color-surface-muted)]">
      <div className="grid min-h-dvh place-items-center px-4 pb-32 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <div className="w-full max-w-md">
          <PageHeader
            eyebrow="Map"
            title="Your map starts here."
            description="This route can become the fullscreen map while the other pages keep safe top padding."
          />
          <div className="mt-6">
            <EmptyState
              title="No pins loaded"
              description="The old map feature can move here once auth and API foundations are ready."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
