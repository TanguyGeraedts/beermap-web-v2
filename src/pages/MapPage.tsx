import { EmptyState, PageHeader } from '../shared/ui';

export const MapPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Map"
        title="Your map starts here."
        description="This route is ready for the map migration slice."
      />
      <EmptyState
        title="No pins loaded"
        description="The old map feature can move here once auth and API foundations are ready."
      />
    </div>
  );
};
