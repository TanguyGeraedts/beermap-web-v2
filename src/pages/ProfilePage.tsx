import {
  BarChart3,
  ChevronRight,
  Crown,
  PenLine,
  Settings,
  ShieldCheck,
  UsersRound
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, EmptyState } from '../shared/ui';
import { useMe } from '../features/profile/useMe';
import type { AccountType } from '../shared/types';

const accountBadge = (accountType: AccountType) => {
  if (accountType === 'ADMIN') {
    return {
      label: 'Admin',
      icon: ShieldCheck,
      className:
        'border border-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_16%,transparent)] text-[var(--color-primary)]'
    };
  }

  if (accountType === 'PREMIUM') {
    return {
      label: 'Premium',
      icon: Crown,
      className:
        'border border-[#d79a18] bg-[#f8e3a3] text-[#6f4b05]'
    };
  }

  return null;
};

const stats = [
  { label: 'Entries', value: '0' },
  { label: 'Drinks', value: '0' },
  { label: 'Days', value: '0' },
  { label: 'Streak', value: '0' }
];

const SectionLabel = ({ children, id }: { children: string; id: string }) => (
  <h2
    className="text-sm font-bold uppercase tracking-[0.32em] text-[var(--color-text)]"
    id={id}
  >
    {children}
  </h2>
);

export const ProfilePage = () => {
  const { error, isLoading, needsSetup, profile, refetch } = useMe();
  const badge = profile ? accountBadge(profile.accountType) : null;
  const BadgeIcon = badge?.icon;
  const avatarInitial = profile?.username.charAt(0).toUpperCase() || 'B';

  return (
    <div className="grid gap-4">
      <header className="grid gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">
          Your account
        </p>
        <h1 className="text-3xl font-bold leading-none text-[var(--color-text)]">
          Profile
        </h1>
      </header>

      <div className="h-px bg-[var(--color-border)]" />

      <Card className="p-4">
        {isLoading ? (
          <p className="text-sm text-[var(--color-muted)]">Loading profile</p>
        ) : error ? (
          <EmptyState
            title="Profile could not load"
            description={error}
            action={
              <button
                className="text-sm font-semibold text-[var(--color-primary)]"
                type="button"
                onClick={() => void refetch()}
              >
                Try again
              </button>
            }
          />
        ) : needsSetup ? (
          <EmptyState
            title="Profile setup needed"
            description="Your account is authenticated, but BeerMap does not have a profile for it yet."
          />
        ) : profile ? (
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {profile.avatarUrl ? (
                <img
                  className="size-16 rounded-lg object-cover"
                  src={profile.avatarUrl}
                  alt={`${profile.username} avatar`}
                />
              ) : (
                <div className="grid size-16 place-items-center rounded-lg bg-[var(--color-surface-muted)] text-2xl font-bold text-[var(--color-text)]">
                  {avatarInitial}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-bold text-[var(--color-text)]">
                  {profile.username}
                  <span className="ml-2 font-medium text-[var(--color-muted)]">
                    #{profile.discriminator}
                  </span>
                </h2>
              </div>
              {badge && BadgeIcon ? (
                <span
                  className={`mt-1.5 inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] ${badge.className}`}
                >
                  <BadgeIcon className="size-3.5" aria-hidden="true" />
                  {badge.label}
                </span>
              ) : null}
              <p className="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                {profile.bio || 'No description yet.'}
              </p>
            </div>
          </div>
        ) : null}
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Link
          className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]"
          to="/profile/edit"
        >
          <PenLine className="size-4" aria-hidden="true" />
          Edit
        </Link>
        <Link
          className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]"
          to="/settings"
        >
          <Settings className="size-4" aria-hidden="true" />
          Settings
        </Link>
      </div>

      <section className="grid gap-3" aria-labelledby="stats-section-title">
        <SectionLabel id="stats-section-title">Your stats</SectionLabel>

        <div className="grid grid-cols-4 gap-2.5">
          {stats.map((stat) => (
            <Card className="px-2 py-4 text-center" key={stat.label}>
              <p className="text-2xl font-bold leading-none text-[var(--color-text)]">
                {stat.value}
              </p>
              <p className="mt-3 text-center text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        <Link
          className="flex min-h-12 items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]"
          to="/profile/stats"
        >
          <BarChart3 className="size-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">View all stats</span>
          </span>
          <ChevronRight
            className="size-5 shrink-0 text-[var(--color-muted)]"
            aria-hidden="true"
          />
        </Link>
      </section>

      <section className="grid gap-3" aria-labelledby="social-section-title">
        <SectionLabel id="social-section-title">Social</SectionLabel>

        <Link
          className="flex min-h-14 items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]"
          to="/friends"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--color-surface-muted)] text-[var(--color-text)]">
            <UsersRound className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">Friends</span>
            <span className="block truncate text-sm text-[var(--color-muted)]">
              0 friends · 0 requests
            </span>
          </span>
          <ChevronRight
            className="size-5 shrink-0 text-[var(--color-muted)]"
            aria-hidden="true"
          />
        </Link>
      </section>
    </div>
  );
};
