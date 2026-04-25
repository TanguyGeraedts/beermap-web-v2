import { useState, type ReactNode } from 'react';
import {
  Beer,
  ChevronRight,
  Component,
  LogOut,
  Map,
  Moon,
  Star,
  Sun
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMe } from '@/hooks/useMe';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

type SectionLabelProps = {
  children: string;
  id: string;
};

type SegmentButtonProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const SectionLabel = ({ children, id }: SectionLabelProps) => (
    <h2
        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]"
        id={id}
    >
      {children}
    </h2>
);

const SegmentButton = ({ children, isActive, onClick }: SegmentButtonProps) => (
    <button
        className={cn(
            'flex min-h-10 flex-1 items-center justify-center gap-2 rounded-md px-2 py-1.5 text-xs font-semibold transition',
            isActive
                ? 'bg-[var(--color-text)] text-[var(--color-app-bg)] shadow-sm'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
        )}
        type="button"
        onClick={onClick}
    >
      {children}
    </button>
);

export const SettingsPage = () => {
  const { logout } = useAuth();
  const { profile } = useMe();
  const { theme, setTheme } = useTheme();
  const [mapStyle, setMapStyle] = useState<'default' | 'light' | 'dark'>(
      'default'
  );
  const [ratingStyle, setRatingStyle] = useState<'stars' | 'beer-mugs'>(
      'stars'
  );

  const isAdmin = profile?.accountType === 'ADMIN';

  return (
      <div className="grid gap-5">
        <header className="grid gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-primary)]">
            Preferences
          </p>
          <h1 className="text-3xl font-bold leading-none text-[var(--color-text)]">
            Settings
          </h1>
        </header>

        <div className="h-px bg-[var(--color-border)]" />

        <div className="grid gap-4">
          <section className="grid gap-2" aria-labelledby="theme-section-title">
            <SectionLabel id="theme-section-title">Theme</SectionLabel>
            <div className="flex max-w-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-sm">
              <SegmentButton
                  isActive={theme === 'light'}
                  onClick={() => setTheme('light')}
              >
                <Sun className="size-3.5" aria-hidden="true" />
                Light
              </SegmentButton>
              <SegmentButton
                  isActive={theme === 'dark'}
                  onClick={() => setTheme('dark')}
              >
                <Moon className="size-3.5" aria-hidden="true" />
                Dark
              </SegmentButton>
            </div>
          </section>

          <section className="grid gap-2" aria-labelledby="map-section-title">
            <SectionLabel id="map-section-title">Map style</SectionLabel>
            <div className="flex max-w-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-sm">
              <SegmentButton
                  isActive={mapStyle === 'default'}
                  onClick={() => setMapStyle('default')}
              >
                <Map className="size-3.5" aria-hidden="true" />
                Default
              </SegmentButton>
              <SegmentButton
                  isActive={mapStyle === 'light'}
                  onClick={() => setMapStyle('light')}
              >
                <Sun className="size-3.5" aria-hidden="true" />
                Light
              </SegmentButton>
              <SegmentButton
                  isActive={mapStyle === 'dark'}
                  onClick={() => setMapStyle('dark')}
              >
                <Moon className="size-3.5" aria-hidden="true" />
                Dark
              </SegmentButton>
            </div>
          </section>

          <section className="grid gap-2" aria-labelledby="rating-section-title">
            <SectionLabel id="rating-section-title">Rating style</SectionLabel>
            <div className="flex max-w-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-sm">
              <SegmentButton
                  isActive={ratingStyle === 'stars'}
                  onClick={() => setRatingStyle('stars')}
              >
                <Star className="size-3.5" aria-hidden="true" />
                Stars
              </SegmentButton>
              <SegmentButton
                  isActive={ratingStyle === 'beer-mugs'}
                  onClick={() => setRatingStyle('beer-mugs')}
              >
                <Beer className="size-3.5" aria-hidden="true" />
                Beer mugs
              </SegmentButton>
            </div>
          </section>
        </div>

        {isAdmin && (
            <section className="grid gap-2 mt-2" aria-labelledby="admin-section-title">
              <SectionLabel id="admin-section-title">Admin</SectionLabel>
              <Link
                  className="flex min-h-12 items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[var(--color-text)] shadow-sm transition hover:border-[var(--color-primary)]"
                  to="/dev/ui"
              >
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[var(--color-surface-muted)] text-[var(--color-text)]">
              <Component className="size-4" aria-hidden="true" />
            </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">UI Components</p>
                  <p className="truncate text-[11px] text-[var(--color-muted)]">
                    Browse library
                  </p>
                </div>
                <ChevronRight
                    className="size-4 shrink-0 text-[var(--color-muted)]"
                    aria-hidden="true"
                />
              </Link>
            </section>
        )}

        <button
            className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-rose-400 bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50"
            type="button"
            onClick={logout}
        >
          <LogOut className="size-3.5" aria-hidden="true" />
          Log out
        </button>
      </div>
  );
};
