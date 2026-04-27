import { Star } from 'lucide-react';

type DrinkLogNoImageCompactProps = {
  headline: string;
  categoryLabel: string;
  ratingLabel: string | null;
  quantity: number | null | undefined;
  consumedLabel: string;
};

export const DrinkLogNoImageCompact = ({
  headline,
  categoryLabel,
  ratingLabel,
  quantity,
  consumedLabel
}: DrinkLogNoImageCompactProps) => {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-muted)_45%,var(--color-surface))] px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="min-w-0 text-2xl font-bold leading-tight text-[var(--color-text)]">
          {headline}
        </h3>
        <span className="shrink-0 pt-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-[var(--color-muted)]">
          {consumedLabel}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-muted)]">
        <span>{categoryLabel}</span>
        {ratingLabel ? (
          <span className="inline-flex items-center gap-1 text-[var(--color-text)]">
            <span>·</span>
            <Star className="size-4 fill-current" />
            {ratingLabel}
          </span>
        ) : null}
        {typeof quantity === 'number' && quantity > 0 ? <span>· {quantity}x</span> : null}
      </div>
    </div>
  );
};
