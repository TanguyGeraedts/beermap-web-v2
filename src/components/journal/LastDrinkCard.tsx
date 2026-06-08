import { useNavigate } from 'react-router-dom';
import { Beer, Loader2 } from 'lucide-react';
import { useDrinkLogTimeline, useUpdateDrinkLog } from '@/hooks/useDrinkLog';
import type { DrinkLogResponse } from '@/types';
import { formatTimeAgo } from '@/utils/date';

export const LastDrinkCard = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useDrinkLogTimeline();
    const { mutate: updateLog, isPending } = useUpdateDrinkLog();

    const lastLog: DrinkLogResponse | null = data?.pages[0]?.content[0] ?? null;

    if (isLoading) {
        return (
            <div
                className="rounded-2xl h-20 animate-pulse"
                style={{ background: 'var(--color-surface)' }}
            />
        );
    }

    if (!lastLog) {
        return (
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                }}
            >
                <Beer size={18} style={{ color: 'var(--color-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                    No drinks logged yet
                </span>
            </div>
        );
    }

    // At this point TypeScript knows lastLog is DrinkLogResponse (not null)
    const log = lastLog;

    const timeAgo = formatTimeAgo(log.consumedAt);

    function handlePlusOne(e: React.MouseEvent) {
        e.stopPropagation();
        updateLog({
            logId: log.id,
            request: { quantity: log.quantity + 1 },
        });
    }

    return (
        <button
            type="button"
            onClick={() => navigate(`/drink-logs/${log.id}`)}
            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors active:scale-[0.99]"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            {/* Icon */}
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--color-ring-soft)' }}
            >
                <Beer size={18} style={{ color: 'var(--color-primary)' }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <p
                    className="text-sm font-semibold truncate leading-tight"
                    style={{ color: 'var(--color-text)' }}
                >
                    {log.displayName}
                </p>
                <p className="text-xs leading-tight mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    {timeAgo}
                    {log.quantity > 1 && (
                        <span className="ml-1.5">· ×{log.quantity}</span>
                    )}
                </p>
            </div>

            {/* +1 button */}
            <button
                type="button"
                onClick={handlePlusOne}
                disabled={isPending}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-colors disabled:opacity-50"
                style={{
                    background: 'var(--color-ring-soft)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-border)',
                }}
                aria-label="Log one more"
            >
                {isPending
                    ? <Loader2 size={14} className="animate-spin" />
                    : <span className="text-xs font-bold">+1</span>
                }
            </button>
        </button>
    );
};