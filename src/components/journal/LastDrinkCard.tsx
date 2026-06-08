import { Loader2 } from 'lucide-react';
import { useDrinkLogTimeline, useUpdateDrinkLog } from '@/hooks/useDrinkLog';
import { drinkCategoryConfig, type DrinkCategory as CategoryType } from '@/types';
import type { DrinkLogResponse } from '@/types';
import { formatTimeAgo } from '@/utils/date';

export const LastDrinkCard = () => {
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
        const defaultCategory = drinkCategoryConfig.BEER;
        const DefaultIcon = defaultCategory.icon;

        return (
            <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                }}
            >
                <DefaultIcon size={18} style={{ color: 'var(--color-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                    No drinks logged yet
                </span>
            </div>
        );
    }

    const log = lastLog;
    const timeAgo = formatTimeAgo(log.consumedAt);

    // Dynamic category configurations lookup
    const categoryKey = (log.category || 'BEER') as CategoryType;
    const config = drinkCategoryConfig[categoryKey] || drinkCategoryConfig.OTHER;
    const CategoryIcon = config.icon;

    function handlePlusOne() {
        updateLog({
            logId: log.id,
            request: { quantity: log.quantity + 1 },
        });
    }

    return (
        <div
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            {/* Dynamic Category Icon Container */}
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-(--color-surface-muted) border border-(--color-border)"
            >
                <CategoryIcon size={18} className={config.color} />
            </div>

            {/* Static Content Text */}
            <div className="flex-1 min-w-0">
                <p
                    className="text-sm font-semibold truncate leading-tight"
                    style={{ color: 'var(--color-text)' }}
                >
                    {log.displayName || log.customDrinkName || 'Custom Drink'}
                </p>
                <p className="text-xs leading-tight mt-0.5" style={{ color: 'var(--color-muted)' }}>
                    {timeAgo}
                    {log.quantity > 1 && (
                        <span className="ml-1.5">· ×{log.quantity}</span>
                    )}
                </p>
            </div>

            {/* +1 Interactive Button Container */}
            <button
                type="button"
                onClick={handlePlusOne}
                disabled={isPending}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl transition-colors disabled:opacity-50 hover:bg-(--color-surface-muted) active:scale-[0.97]"
                style={{
                    background: 'var(--color-ring-soft)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-border)',
                }}
                aria-label="Log one more"
            >
                {isPending ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : (
                    <span className="text-xs font-bold">+1</span>
                )}
            </button>
        </div>
    );
};