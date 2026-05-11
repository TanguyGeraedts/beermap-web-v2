import { useState } from 'react';
import { useFriendships } from '@/hooks/useFriendships';
import { FriendshipHeader, FriendTab } from "@/components/friendship/FriendshipHeader.tsx";
import {FriendListItem} from "@/components/friendship/FriendListItem.tsx";
import {AddFriendView} from "@/components/friendship/AddFriendView.tsx";


export const FriendsPage = () => {
    const [tab, setTab] = useState<FriendTab>('friends');
    const { friends, received, sent, actions, isLoading } = useFriendships();

    const renderContent = () => {
        if (tab === 'add') {
            return <AddFriendView onSend={actions.send} />;
        }

        const activeList = tab === 'friends' ? friends : tab === 'received' ? received : sent;

        if (activeList.length === 0) {
            return (
                <div className="py-20 text-center text-(--color-muted)">
                    Nothing to show here yet.
                </div>
            );
        }

        return (
            <div className="space-y-3 mt-4">
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
        <main className="max-w-md mx-auto p-4 min-h-dvh">
            <FriendshipHeader
                activeTab={tab}
                onTabChange={setTab}
                counts={{ friends: friends.length, received: received.length }}
            />
            {isLoading ? (
                <div className="py-10 text-center text-(--color-muted)">Loading...</div>
            ) : (
                renderContent()
            )}
        </main>
    );
};