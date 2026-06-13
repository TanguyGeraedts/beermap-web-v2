import {Avatar, Button, Card, UserRankPill} from '@/components/ui';
import { FriendTab } from "@/components/friendship/FriendshipHeader.tsx";
import { Friendship } from "@/types/friendship";
import { formatTimeAgo } from "@/utils/date";
import { X, Check } from 'lucide-react';

interface FriendListItemProps {
    item: Friendship;
    tab: FriendTab;
    actions: {
        accept: (params: { userId: string }) => Promise<any>;
        reject: (friendshipId: string) => Promise<any>;
        cancel: (friendshipId: string) => Promise<any>;
        remove: (friendshipId: string) => Promise<any>;
    };
}

export const FriendListItem = ({ item, tab, actions }: FriendListItemProps) => {
    const friend = item.friend;

    const handleRemoveAction = async () => {
        try {
            const targetId = friend?.id;
            if (!targetId) return;

            if (tab === 'friends') await actions.remove(targetId);
            if (tab === 'sent') await actions.cancel(targetId);
            if (tab === 'received') await actions.reject(targetId);
        } catch (error) {
            console.error("Action failed", error);
        }
    };

    const getTimeLabel = () => {
        if (tab === 'friends' && item.respondedAt) {
            return `Friends ${formatTimeAgo(item.respondedAt)}`;
        }
        return `${tab.charAt(0).toUpperCase() + tab.slice(1)} ${formatTimeAgo(item.createdAt)}`;
    };

    return (
        <Card variant="muted">
            {/* Re-introducing justify-between to anchor the action group to the right wall */}
            <Card.Body className="flex items-center justify-between p-4">

                {/* Left Group: Avatar + Identity Info */}
                <div className="flex items-center gap-4">
                    <Avatar
                        size="lg"
                        src={friend?.avatarUrl ?? undefined}
                        fallback={friend?.username ?? "?"}
                    />

                    <div className="flex flex-col gap-0.5">
                        {/* Row 1: Name#Discriminator (Rank) */}
                        <div className="flex items-center gap-2">
                        <span className="font-bold text-(--color-text)">
                            {friend?.username ?? "Unknown User"}
                            {friend?.discriminator && (
                                <span className="font-mono text-xs font-normal text-(--color-muted) ml-1">
                                    #{friend.discriminator}
                                </span>
                            )}
                        </span>
                            {friend?.accountType && (
                                <UserRankPill accountType={friend.accountType} compact />
                            )}
                        </div>

                        {/* Row 2: Friendship status timeline */}
                        <p className="text-xs text-(--color-muted)">
                            {getTimeLabel()}
                        </p>
                    </div>
                </div>

                {/* Right Group: Locked cleanly to the right edge with a small negative margin trick if you want it closer to the corner */}
                <div className="flex items-center gap-1 shrink-0 ml-4">
                    {tab === 'received' && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="p-2 text-emerald-500 hover:bg-emerald-50/50 rounded-full"
                            onClick={() => friend?.id && actions.accept({ userId: friend.id })}
                            title="Accept Request"
                        >
                            <Check size={18} strokeWidth={2.5} />
                        </Button>
                    )}

                    <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 text-red-500 border-none hover:bg-red-50/50 rounded-full"
                        onClick={handleRemoveAction}
                        title={tab === 'friends' ? 'Remove Friend' : tab === 'sent' ? 'Cancel Request' : 'Decline Request'}
                    >
                        <X size={18} strokeWidth={2.5} />
                    </Button>
                </div>

            </Card.Body>
        </Card>
    );
}