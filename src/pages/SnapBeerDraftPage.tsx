import { ArrowLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, EmptyState, PageHeader } from '@/components/ui';

export const SnapBeerDraftPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Draft"
        title="Snap a beer"
        description="Capture a quick beer photo and create a draft to finish later."
      />

      <Card className="grid gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]">
          <Camera className="size-3.5" />
          Fast draft flow
        </div>
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          This route is connected from the map quick action. Next we can plug camera
          capture and draft prefill logic into this screen.
        </p>
      </Card>

      <EmptyState
        title="Camera draft flow coming next"
        description="Use this entry point for fast capture and save-as-draft behavior."
        action={
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]"
            to="/map"
          >
            <ArrowLeft className="size-4" />
            Back to map
          </Link>
        }
      />
    </div>
  );
};
