import { Star } from 'lucide-react';
import { DrinkLogMedia } from '@/components/feed/DrinkLogMedia';
import { DrinkLogNoImageCompact } from '@/components/feed/DrinkLogNoImageCompact';
import { FeedActionRow } from '@/components/feed/FeedActionRow';
import { FeedActorHeader } from '@/components/feed/FeedActorHeader';
import { Card } from '@/components/ui';
import type { FeedItemResponse } from '@/types';

type FeedItemCardProps = {
  item: FeedItemResponse;
  isTogglingCheers?: boolean;
  onToggleCheers: (item: FeedItemResponse) => void;
};

const relativeFormatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
});

const absoluteFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric'
});

const formatEnumLabel = (value: string) => {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const formatDateTag = (value: string | null | undefined) => {
  if (!value) {
    return null;
  }

  const date = Date.parse(value);

  if (Number.isNaN(date)) {
    return null;
  }

  return absoluteFormatter.format(date).toUpperCase();
};

const formatRelativeTime = (value: string | null | undefined) => {
  if (!value) {
    return 'Just now';
  }

  const timestamp = Date.parse(value);

  if (Number.isNaN(timestamp)) {
    return 'Just now';
  }

  const delta = timestamp - Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (Math.abs(delta) < hour) {
    return relativeFormatter.format(Math.round(delta / minute), 'minute');
  }

  if (Math.abs(delta) < day) {
    return relativeFormatter.format(Math.round(delta / hour), 'hour');
  }

  if (Math.abs(delta) < week) {
    return relativeFormatter.format(Math.round(delta / day), 'day');
  }

  return relativeFormatter.format(Math.round(delta / week), 'week');
};

const formatFivePointRating = (rating: number | null | undefined) => {
  if (typeof rating !== 'number') {
    return null;
  }

  const clampedTenScale = Math.min(Math.max(rating, 0), 10);
  const fiveScale = clampedTenScale / 2;

  return `${Number.isInteger(fiveScale) ? fiveScale : fiveScale.toFixed(1)}/5`;
};

const FeedFallbackCard = ({
  item,
  isTogglingCheers = false,
  onToggleCheers
}: FeedItemCardProps) => {
  return (
    <Card className="grid gap-4 p-4">
      <div className="grid gap-1.5">
        <p className="text-sm font-semibold text-[var(--color-text)]">
          {formatEnumLabel(item.type)}
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          {formatRelativeTime(item.createdAt)}
        </p>
      </div>
      <p className="text-sm leading-6 text-[var(--color-muted)]">
        This feed event is available but does not have a dedicated card yet.
      </p>
      <div className="h-px bg-[var(--color-border)]/70" />
      <FeedActionRow
        cheersCount={item.cheersCount}
        cheeredByMe={item.cheeredByMe}
        isTogglingCheers={isTogglingCheers}
        onToggleCheers={() => onToggleCheers(item)}
      />
    </Card>
  );
};

const DrinkLogFeedItemCard = ({
  item,
  isTogglingCheers = false,
  onToggleCheers
}: FeedItemCardProps) => {
  const actor = item.details?.actor;
  const drinkLog = item.details?.drinkLog;
  const actorName = actor?.username || 'Someone';
  const actorTag = actor?.discriminator ? `#${actor.discriminator}` : null;
  const relativeTime = formatRelativeTime(item.createdAt);
  const category = drinkLog?.category ? formatEnumLabel(drinkLog.category) : null;
  const subType = drinkLog?.subType ? formatEnumLabel(drinkLog.subType) : null;
  const drinkTitle = drinkLog?.displayName || 'a drink';
  const rating = drinkLog?.rating;
  const ratingLabel = formatFivePointRating(rating);
  const extraCount =
    typeof drinkLog?.quantity === 'number' && drinkLog.quantity > 1
      ? drinkLog.quantity - 1
      : 0;
  const headline = extraCount > 0 ? `${drinkTitle} + ${extraCount} more` : drinkTitle;
  const mediaRightLabel = formatDateTag(drinkLog?.consumedAt) || 'NOW';
  const badgeLabel = category ? category.toUpperCase() : 'BEER';
  const categoryLabel = subType || category || 'Drink log';
  const hasPhoto = Boolean(drinkLog?.photoUrl);

  return (
    <Card className="grid gap-4 p-4">
      <FeedActorHeader
        activityLabel="tasting session"
        actorAvatarUrl={actor?.avatarUrl ?? null}
        actorName={actorName}
        actorTag={actorTag}
        badgeLabel={badgeLabel}
        relativeTime={relativeTime}
      />

      {hasPhoto ? (
        <div className="grid gap-1.5">
          <h3 className="text-3xl font-bold leading-tight text-[var(--color-text)]">
            {headline}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-muted)]">
            <span>{categoryLabel}</span>
            {ratingLabel ? (
              <span className="inline-flex items-center gap-1 text-[var(--color-text)]">
                <span>·</span>
                <Star className="size-4 fill-current" />
                {ratingLabel}
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <DrinkLogNoImageCompact
          categoryLabel={categoryLabel}
          consumedLabel={mediaRightLabel}
          headline={headline}
          quantity={drinkLog?.quantity}
          ratingLabel={ratingLabel}
        />
      )}

      {hasPhoto ? (
        <DrinkLogMedia drinkName={drinkTitle} photoUrl={drinkLog?.photoUrl ?? ''} />
      ) : null}

      <div className="h-px bg-[var(--color-border)]/70" />
      <FeedActionRow
        cheersCount={item.cheersCount}
        cheeredByMe={item.cheeredByMe}
        isTogglingCheers={isTogglingCheers}
        onToggleCheers={() => onToggleCheers(item)}
      />
    </Card>
  );
};

export const FeedItemCard = ({
  item,
  isTogglingCheers = false,
  onToggleCheers
}: FeedItemCardProps) => {
  if (item.type === 'DRINK_LOG_CREATED') {
    return (
      <DrinkLogFeedItemCard
        item={item}
        isTogglingCheers={isTogglingCheers}
        onToggleCheers={onToggleCheers}
      />
    );
  }

  return (
    <FeedFallbackCard
      item={item}
      isTogglingCheers={isTogglingCheers}
      onToggleCheers={onToggleCheers}
    />
  );
};
