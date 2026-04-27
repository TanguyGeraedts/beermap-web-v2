import { useState } from 'react';
import { Beer, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';

type FeedActionRowProps = {
  cheersCount: number;
  cheeredByMe: boolean;
  isTogglingCheers?: boolean;
  onToggleCheers: () => void;
  commentsCount?: number;
};

export const FeedActionRow = ({
  cheersCount,
  cheeredByMe,
  isTogglingCheers = false,
  onToggleCheers,
  commentsCount = 0
}: FeedActionRowProps) => {
  const [cheersAnimationTick, setCheersAnimationTick] = useState(0);

  return (
    <div className="flex items-center gap-2">
      <Button
        className={cn(
          'h-9 rounded-full px-4 text-base font-semibold',
          cheeredByMe
            ? 'bg-[#d8ecff] text-[#0a87dc] hover:bg-[#cfe7ff]'
            : 'bg-[var(--color-surface-muted)] text-[#0a87dc] hover:bg-[color-mix(in_srgb,var(--color-surface-muted)_65%,#d8ecff)]'
        )}
        disabled={isTogglingCheers}
        onClick={() => {
          setCheersAnimationTick((value) => value + 1);
          onToggleCheers();
        }}
        size="sm"
        variant="ghost"
      >
        <Beer
          className={cn(
            'size-4',
            cheeredByMe && 'fill-current',
            cheersAnimationTick > 0 && 'animate-[cheers-clink_420ms_ease-out]'
          )}
          key={`${cheersAnimationTick}-${cheeredByMe ? 'on' : 'off'}`}
        />
        Cheers · {cheersCount}
      </Button>
      <Button
        className="h-9 rounded-full px-3 text-base font-semibold text-[var(--color-muted)] hover:text-[var(--color-muted)]"
        disabled
        size="sm"
        variant="ghost"
      >
        <MessageCircle className="size-4" />
        Comment · {commentsCount}
      </Button>
    </div>
  );
};
