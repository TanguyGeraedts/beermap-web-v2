import type { FeedItem } from '@/types/feed';
import { Avatar } from '@/components/ui/components/Avatar';
import { Badge } from '@/components/ui/components/Badge';
import { UserRankPill } from '@/components/ui/components/UserRankPill';
import { drinkCategoryConfig, type DrinkCategory } from '@/types/drinkCategory';
import {formatTimeAgo} from "@/utils/date.ts";

interface Props {
    item: FeedItem;
}

export const FeedItemDrinkLog = ({ item }: Props) => {
    const { actor, drinkLog } = item.details;
    if (!drinkLog) return null;

    const category = drinkLog.category?.toUpperCase() as DrinkCategory;
    const config = drinkCategoryConfig[category] ?? drinkCategoryConfig.OTHER;
    const Icon = config.icon;
    const timeAgo = formatTimeAgo(item.createdAt);

    return (
        <div className="flex flex-col">
            {/* Full-width photo at top */}
            {drinkLog.photoUrl && (
                <img
                    src={drinkLog.photoUrl}
                    alt={drinkLog.displayName}
                    className="w-full h-64 object-cover rounded-t-2xl"
                />
            )}

            {/* Content below photo */}
            <div className="p-4">
                {/* User header with rank pill */}
                <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                        <Avatar
                            src={actor.avatarUrl}
                            fallback={actor.username}
                            size="sm"
                        />
                        <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                            {actor.username}
                        </p>
                    </div>
                    <UserRankPill
                        accountType={actor.accountType}
                        compact
                    />
                </div>

                {/* Timestamp */}
                <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>
                    Member #{actor.discriminator} · {timeAgo}
                </p>

                {/* Logged a drink label */}
                <p className="text-sm mb-2" style={{ color: 'var(--color-muted)' }}>
                    Logged a drink
                </p>

                {/* Drink name + rating */}
                <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <Icon size={20} className={config.color} />
                        <p className="font-bold text-xl truncate" style={{ color: 'var(--color-text)' }}>
                            {drinkLog.displayName}
                        </p>
                    </div>
                    {drinkLog.rating != null && (
                        <div className="flex items-center gap-1 shrink-0">
                            <span style={{ fontSize: '20px', color: '#f59e0b' }}>★</span>
                            <span className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                                {(drinkLog.rating / 2).toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Subtype badge + quantity */}
                <div className="flex items-center gap-2 flex-wrap">
                    {drinkLog.subType && (
                        <Badge variant="default" size="sm">
                            {drinkLog.subType}
                        </Badge>
                    )}
                    {drinkLog.quantity && drinkLog.quantity > 1 && (
                        <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                            ×{drinkLog.quantity}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
