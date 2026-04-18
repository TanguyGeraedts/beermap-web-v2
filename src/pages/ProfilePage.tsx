import { ButtonLink, Card, PageHeader } from '../shared/ui';

export const ProfilePage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Profile"
        title="Tanguy"
        description="Profile, app preferences, and developer tools live here."
      />

      <Card>
        <div className="flex items-center gap-4">
          <div className="grid size-16 place-items-center rounded-lg bg-[var(--color-primary)] text-xl font-bold text-[var(--color-primary-contrast)]">
            T
          </div>
          <div>
            <p className="font-semibold text-[var(--color-text)]">
              BeerMap explorer
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Profile data will come from the API later.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3">
        <ButtonLink href="/settings">Settings</ButtonLink>
        {import.meta.env.DEV ? (
          <ButtonLink href="/dev/ui" variant="secondary">
            UI components
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
};
