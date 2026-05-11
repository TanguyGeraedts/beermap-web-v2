import { Avatar, Button, Card } from '@/components/ui';
import { FriendTab } from "@/components/friendship/FriendshipHeader.tsx";
import { Friendship } from "@/types/friendship";

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
    const user = item.user;
    const targetUserId = user?.id || item.requesterId;

    const handleRemoveAction = async () => {
        try {
            const targetId = item.user?.id
                ? item.addresseeId
                : item.requesterId;

            if (tab === 'friends') await actions.remove(targetId);
            if (tab === 'sent')    await actions.cancel(targetId);
            if (tab === 'received') await actions.reject(targetId);
        } catch (error) {
            console.error("Action failed", error);
        }
    };

    return (
        <Card variant="muted">
            <Card.Body className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar
                        size="md"
                        src={user?.avatarUrl || undefined}
                        fallback={user?.username || "Guest"}
                    />
                    <div>
                        <p className="font-bold text-(--color-text)">
                            {user?.username || "Unknown User"}
                        </p>
                        <p className="text-xs text-(--color-muted) font-mono">
                            {user?.discriminator ? `#${user.discriminator}` : item.status}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {tab === 'received' && (
                        <Button
                            size="sm"
                            onClick={() => actions.accept({ userId: targetUserId })}
                        >
                            Accept
                        </Button>
                    )}

                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 border-red-500/20 hover:bg-red-50"
                        onClick={handleRemoveAction}
                    >
                        {tab === 'friends' ? 'Remove' : tab === 'sent' ? 'Cancel' : 'Decline'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};