import type { FeedItem as FeedItemType } from '@/types/feed';
import { FeedItemDrinkLog } from './FeedItemDrinkLog';
import { CheersButton } from './CheersButton';
import { useCheers } from '@/hooks/useCheers';

interface Props {
    item: FeedItemType;
}

export const FeedItem = ({ item }: Props) => {
    const { cheer, uncheer } = useCheers();

    const handleCheerToggle = () => {
        if (item.cheeredByMe) {
            uncheer.mutate(item.id);
        } else {
            cheer.mutate(item.id);
        }
    };

    return (
        <article
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
            }}
        >
            <div className="flex-1">
                {item.type === 'DRINK_LOG_CREATED' && <FeedItemDrinkLog item={item} />}

                {item.type !== 'DRINK_LOG_CREATED' && (
                    <div className="p-4">
                        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                            {item.details.actor.username} — {item.type.toLowerCase().replace(/_/g, ' ')}
                        </p>
                    </div>
                )}
            </div>

            <div
                className="flex items-center justify-between px-4 py-4"
                style={{ borderTop: '1px solid var(--color-border)' }}
            >
                <CheersButton
                    cheeredByMe={item.cheeredByMe}
                    cheersCount={item.cheersCount}
                    isPending={cheer.isPending || uncheer.isPending}
                    onToggle={handleCheerToggle}
                />
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {item.cheersCount} reaction{item.cheersCount !== 1 ? 's' : ''}
                </span>
            </div>
        </article>
    );
};