import { ArrowLeft, NotebookPen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, EmptyState, PageHeader } from '@/components/ui';

export const LogBeerPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Log"
        title="Log a beer"
        description="Create a complete beer log with drink details, rating, location, and notes."
      />

      <Card className="grid gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--color-muted)]">
          <NotebookPen className="size-3.5" />
          Full entry flow
        </div>
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          This page is ready as the dedicated full log flow entrypoint. Next we can
          plug in the actual form and API submit.
        </p>
      </Card>

      <EmptyState
        title="Log form coming next"
        description="This route is now wired so the map quick action can open the full log flow."
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
