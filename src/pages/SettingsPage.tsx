import { Component } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMe } from '../features/profile/useMe';
import { ThemeSelector } from '../features/theme/ThemeSelector';
import { Card, PageHeader } from '../shared/ui';

export const SettingsPage = () => {
  const { profile } = useMe();
  const isAdmin = profile?.accountType === 'ADMIN';

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Make it yours."
        description="Theme choices are stored locally for now and can later sync to your profile."
      />
      <Card>
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Theme
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Choose between light and dark mode. More named themes can still be
          added later using the same token system.
        </p>
        <div className="mt-5">
          <ThemeSelector />
        </div>
      </Card>

      {isAdmin ? (
        <Card>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            Admin
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
            Tools for checking reusable app pieces while BeerMap grows.
          </p>
          <Link
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            to="/dev/ui"
          >
            <Component className="size-4" aria-hidden="true" />
            UI components
          </Link>
        </Card>
      ) : null}
    </div>
  );
};
