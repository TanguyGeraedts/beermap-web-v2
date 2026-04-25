import { ButtonLink, Card, EmptyState, PageHeader } from '@/components/ui';

export const JournalPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Journal"
        title="Your drink journal."
        description="The journal will become your timeline of logged drinks, places, notes, and ratings."
      />

      <Card>
        <p className="text-sm font-semibold text-[var(--color-text)]">
          First migration target
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          This is a good next vertical slice: list, detail, create, edit, and
          delete logs can move over as one feature area.
        </p>
        <ButtonLink className="mt-5" href="/map" size="sm" variant="secondary">
          Check map
        </ButtonLink>
      </Card>

      <EmptyState
        title="No journal entries yet"
        description="Once the API layer is connected, your latest logs will land here."
      />
    </div>
  );
};
