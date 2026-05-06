import { useEffect, useMemo, useState } from 'react';
import { Beer, Flame, GlassWater, Martini, Sparkles, Trophy, Wine } from 'lucide-react';
import { Button, Card, EmptyState } from '@/components/ui';
import { statsService } from '@/services/statsService';
import { cn } from '@/utils/cn';
import type { DrinkCategory, StatsOverviewResponse } from '@/types';

type CategoryFilter = 'ALL' | DrinkCategory;

const categoryLabel: Record<DrinkCategory, string> = {
  BEER: 'Beer',
  WINE: 'Wine',
  COCKTAIL: 'Cocktail',
  SPIRITS: 'Spirits',
  OTHER: 'Other'
};

const categoryIcon: Record<DrinkCategory, typeof Beer> = {
  BEER: Beer,
  WINE: Wine,
  COCKTAIL: Martini,
  SPIRITS: GlassWater,
  OTHER: Sparkles
};

const categoryColor: Record<DrinkCategory, { bar: string; pill: string }> = {
  BEER: {
    bar: 'bg-amber-500',
    pill: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  WINE: {
    bar: 'bg-rose-500',
    pill: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  COCKTAIL: {
    bar: 'bg-fuchsia-500',
    pill: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300'
  },
  SPIRITS: {
    bar: 'bg-orange-700',
    pill: 'bg-orange-100 text-orange-800 border-orange-300'
  },
  OTHER: {
    bar: 'bg-slate-500',
    pill: 'bg-slate-100 text-slate-700 border-slate-300'
  }
};

export const StatsPage = () => {
  const [stats, setStats] = useState<StatsOverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL');

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await statsService.getMyOverview();
      setStats(data);
    } catch {
      setError('Could not load your stats right now.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const categoryCounts = useMemo(() => {
    const initial: Record<DrinkCategory, number> = {
      BEER: 0,
      WINE: 0,
      COCKTAIL: 0,
      SPIRITS: 0,
      OTHER: 0
    };

    for (const item of stats?.categories.drinksByCategory ?? []) {
      initial[item.category] = item.drinks;
    }

    return initial;
  }, [stats]);

  const categoryEntries = useMemo(() => {
    const initial: Record<DrinkCategory, number> = {
      BEER: 0,
      WINE: 0,
      COCKTAIL: 0,
      SPIRITS: 0,
      OTHER: 0
    };

    for (const item of stats?.categories.entriesByCategory ?? []) {
      initial[item.category] = item.drinks;
    }

    return initial;
  }, [stats]);

  const orderedCategories = useMemo(
    () =>
      (Object.keys(categoryCounts) as DrinkCategory[]).sort(
        (left, right) => categoryCounts[right] - categoryCounts[left]
      ),
    [categoryCounts]
  );

  const totalDrinks = stats?.totals.totalDrinks ?? 0;
  const selectedCategoryDrinks =
    categoryFilter === 'ALL' ? totalDrinks : categoryCounts[categoryFilter];
  const selectedCategoryLogs =
    categoryFilter === 'ALL'
      ? (stats?.totals.totalEntries ?? 0)
      : categoryEntries[categoryFilter];

  const peakHour = stats?.time.peakHour;

  const bestDay = useMemo(() => {
    const days = stats?.time.drinksPerDay ?? [];
    return days.reduce<{ day: string; drinks: number } | null>((best, item) => {
      if (!best || item.drinks > best.drinks) {
        return { day: item.day, drinks: item.drinks };
      }
      return best;
    }, null);
  }, [stats]);

  const filterButtons: Array<{ value: CategoryFilter; label: string; icon: typeof Beer }> = [
    { value: 'ALL', label: 'All', icon: Sparkles },
    { value: 'BEER', label: 'Beer', icon: Beer },
    { value: 'WINE', label: 'Wine', icon: Wine },
    { value: 'COCKTAIL', label: 'Cocktail', icon: Martini },
    { value: 'SPIRITS', label: 'Spirits', icon: GlassWater },
    { value: 'OTHER', label: 'Other', icon: Sparkles }
  ];

  const sectionTitle = (value: string) => (
    <h2 className="inline-flex items-center gap-3 text-[1.85rem] font-extrabold leading-none text-[var(--color-text)]">
      {value}
    </h2>
  );

  if (error) {
    return (
      <EmptyState
        title="Stats unavailable"
        description={error}
        action={<Button onClick={() => void loadStats()}>Try again</Button>}
      />
    );
  }

  return (
    <div className="grid gap-6 pb-6">
      <header className="grid gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Stats
        </p>
        {sectionTitle('Your numbers.')}
        {categoryFilter !== 'ALL' ? (
          <div>
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold',
                categoryColor[categoryFilter].pill
              )}
            >
              Filtered: {categoryLabel[categoryFilter]}
            </span>
          </div>
        ) : null}
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {filterButtons.map((button) => {
            const Icon = button.icon;
            const isActive = categoryFilter === button.value;
            return (
              <button
                key={button.value}
                type="button"
                onClick={() => setCategoryFilter(button.value)}
                className={cn(
                  'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition',
                  isActive
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
                )}
              >
                <Icon className="size-4" />
                {button.label}
              </button>
            );
          })}
        </div>
      </header>

      <section className="grid gap-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Overview
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Total logs
            </p>
            <p className="mt-2.5 text-3xl font-extrabold text-[var(--color-text)]">
              {selectedCategoryLogs}
            </p>
          </Card>
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Total drinks
            </p>
            <p className="mt-2.5 text-3xl font-extrabold text-[var(--color-text)]">
              {selectedCategoryDrinks}
            </p>
          </Card>
          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
              Active days
            </p>
            <p className="mt-2.5 text-3xl font-extrabold text-[var(--color-text)]">
              {stats?.totals.activeDays ?? '—'}
            </p>
          </Card>
          {categoryFilter === 'ALL' ? (
            <Card>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                Peak hour
              </p>
              <p className="mt-2.5 text-3xl font-extrabold text-[var(--color-text)]">
                {peakHour == null ? '—' : `${String(peakHour).padStart(2, '0')}:00`}
              </p>
            </Card>
          ) : null}
          {categoryFilter === 'ALL' ? (
            <Card className="border-[var(--color-primary)]">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
                <Flame className="size-3.5" /> Streak
              </p>
              <p className="mt-2.5 text-3xl font-extrabold text-[var(--color-primary)]">
                {stats?.time.streak ?? '—'}d
              </p>
            </Card>
          ) : null}
          <Card>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
              <Trophy className="size-3.5" /> Best day
            </p>
            <p className="mt-2.5 text-3xl font-extrabold text-[var(--color-text)]">
              {bestDay?.drinks ?? '—'}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {bestDay?.day
                ? new Date(bestDay.day).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short'
                  })
                : '—'}
            </p>
          </Card>
        </div>
      </section>

      <section className="grid gap-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Favorites
        </h3>
        <Card className="grid gap-2 text-lg">
          <p className="text-[var(--color-muted)]">
            Overall:{' '}
            <span className="font-bold text-[var(--color-text)]">
              {stats?.favorites.favoriteDrinkOverall?.name ?? '—'}
            </span>
          </p>
          <p className="text-[var(--color-muted)]">
            This month:{' '}
            <span className="font-bold text-[var(--color-text)]">
              {stats?.favorites.favoriteDrinkThisMonth?.name ?? '—'}
            </span>
          </p>
          <p className="text-[var(--color-muted)]">
            Top category this month:{' '}
            {stats?.favorites.favoriteCategoryThisMonth ? (
              <span
                className={cn(
                  'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold',
                  categoryColor[stats.favorites.favoriteCategoryThisMonth.category].pill
                )}
              >
                {
                  categoryLabel[
                    stats.favorites.favoriteCategoryThisMonth.category
                  ]
                }
              </span>
            ) : (
              <span className="font-bold text-[var(--color-text)]">—</span>
            )}
          </p>
        </Card>
      </section>

      {categoryFilter === 'ALL' ? (
      <section className="grid gap-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          By category
        </h3>
        <Card className="grid gap-5">
          <div className="flex h-3 overflow-hidden rounded-full bg-[var(--color-surface-muted)]">
            {orderedCategories.map((category) => {
              const pct = totalDrinks > 0 ? (categoryCounts[category] / totalDrinks) * 100 : 0;
              return (
                <div
                  key={category}
                  className={cn(
                    'h-full min-w-1 border-r border-black/20 last:border-r-0 transition-opacity',
                    categoryColor[category].bar
                  )}
                  style={{ width: `${pct}%` }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-1">
            {orderedCategories.map((category) => {
              const Icon = categoryIcon[category];
              const pct = totalDrinks > 0 ? Math.round((categoryCounts[category] / totalDrinks) * 100) : 0;
              return (
                <p key={category} className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-text)]">
                  <span className={cn('size-2 rounded-full', categoryColor[category].bar)} />
                  <Icon className="size-3 text-[var(--color-muted)]" />
                  {pct}%
                </p>
              );
            })}
          </div>
        </Card>
      </section>
      ) : null}

      {!stats && !error ? (
        <EmptyState title="Loading stats" description="Fetching your latest numbers..." />
      ) : null}

      <div className="flex justify-end">
        <Button onClick={() => void loadStats()} variant="ghost" disabled={isLoading}>
          Refresh stats
        </Button>
      </div>
    </div>
  );
};
