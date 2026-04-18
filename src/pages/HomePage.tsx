import appPreview from '../assets/app-preview.svg';
import { ButtonLink, Card, PageHeader } from '../shared/ui';

export const HomePage = () => {
  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="BeerMap v2"
        title="A fresh map for every good drink."
        description="The new app starts mobile-first, installable, and ready for modular feature slices."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Theme system
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Colors now come from tokens, so adding a seasonal theme is a small
            controlled change.
          </p>
          <ButtonLink className="mt-5" href="/settings" size="sm">
            Change theme
          </ButtonLink>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Dev preview
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Reusable UI components have a private preview page reachable from
            your profile.
          </p>
          <ButtonLink
            className="mt-5"
            href="/dev/ui"
            size="sm"
            variant="secondary"
          >
            Open UI page
          </ButtonLink>
        </Card>
      </div>

      <img
        className="mx-auto w-full max-w-sm"
        src={appPreview}
        alt="BeerMap app preview"
      />
    </div>
  );
};
