import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriendships } from '@/hooks/useFriendships';
import { FriendshipHeader, type FriendTab } from "@/components/friendship/FriendshipHeader.tsx";
import { FriendListItem } from "@/components/friendship/FriendListItem.tsx";
import { AddFriendView } from "@/components/friendship/AddFriendView.tsx";
import { Button } from '@/components/ui';
import { Users, ChevronLeft } from 'lucide-react';

export const FriendsPage = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<FriendTab>('friends');
    const { friends, received, sent, actions, isLoading } = useFriendships();

    const renderContent = () => {
        if (tab === 'add') {
            return <AddFriendView onSend={actions.send} />;
        }

        const activeList = tab === 'friends' ? friends : tab === 'received' ? received : sent;

        if (activeList.length === 0) {
            return (
                <div className="py-12 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
                    Nothing to show here yet.
                </div>
            );
        }

        return (
            <div className="space-y-2 mt-2">
                {activeList.map((item) => (
                    <FriendListItem
                        key={item.id}
                        item={item}
                        tab={tab}
                        actions={actions}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Users size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Friends</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="rounded-xl"
                >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    Profile
                </Button>
            </div>

            <div
                className="px-4 py-4 rounded-2xl border"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
                <FriendshipHeader
                    activeTab={tab}
                    onTabChange={setTab}
                    counts={{ friends: friends.length, received: received.length }}
                />

                {isLoading ? (
                    <div className="py-12 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
                        Loading...
                    </div>
                ) : (
                    renderContent()
                )}
            </div>
        </div>
    );
};