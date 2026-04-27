import { Beer } from 'lucide-react';
import { cn } from '@/utils/cn';

type FeedActorHeaderProps = {
  actorName: string;
  actorTag: string | null;
  actorAvatarUrl: string | null;
  relativeTime: string;
  activityLabel: string;
  badgeLabel: string;
};

const ActorAvatar = ({
  username,
  avatarUrl
}: {
  username: string;
  avatarUrl: string | null;
}) => {
  const initial = username.charAt(0).toUpperCase();

  if (avatarUrl) {
    return (
      <img
        alt={`${username} avatar`}
        className="size-10 rounded-full border border-[var(--color-border)] object-cover"
        src={avatarUrl}
      />
    );
  }

  return (
    <div className="grid size-10 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-sm font-bold text-[var(--color-text)]">
      {initial}
    </div>
  );
};

export const FeedActorHeader = ({
  actorName,
  actorTag,
  actorAvatarUrl,
  relativeTime,
  activityLabel,
  badgeLabel
}: FeedActorHeaderProps) => {
  const normalizedBadgeLabel = badgeLabel.toUpperCase();
  const badgeClassName = cn(
    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]',
    normalizedBadgeLabel === 'BEER' &&
      'border border-[#f0d090] bg-[#f8e7c5] text-[#b66b00]',
    normalizedBadgeLabel === 'WINE' &&
      'border border-[#dcb2c3] bg-[#f3d6e2] text-[#9a2f59]',
    normalizedBadgeLabel === 'COCKTAIL' &&
      'border border-[#9ed9cb] bg-[#d8f0eb] text-[#0f7d67]',
    normalizedBadgeLabel === 'SPIRITS' &&
      'border border-[#b6c1f5] bg-[#e5e8ff] text-[#4354b3]',
    normalizedBadgeLabel === 'OTHER' &&
      'border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-muted)]',
    !['BEER', 'WINE', 'COCKTAIL', 'SPIRITS', 'OTHER'].includes(normalizedBadgeLabel) &&
      'border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-muted)]'
  );

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <ActorAvatar avatarUrl={actorAvatarUrl} username={actorName} />
        <div className="min-w-0">
          <p className="truncate text-sm text-[var(--color-text)]">
            <span className="font-semibold">{actorName}</span>
            {actorTag ? (
              <span className="ml-1 font-mono text-xs text-[var(--color-muted)]">
                {actorTag}
              </span>
            ) : null}
            <span className="text-[var(--color-muted)]"> - {activityLabel}</span>
          </p>
          <p className="text-xs text-[var(--color-muted)]">{relativeTime}</p>
        </div>
      </div>
      <span className={badgeClassName}>
        <Beer className="size-3.5" />
        {normalizedBadgeLabel}
      </span>
    </div>
  );
};
