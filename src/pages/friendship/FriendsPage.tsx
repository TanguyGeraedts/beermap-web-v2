import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFriendships } from '@/hooks/useFriendships';
import { FriendshipHeader, type FriendTab } from "@/components/friendship/FriendshipHeader.tsx";
import { FriendListItem } from "@/components/friendship/FriendListItem.tsx";
import { AddFriendView } from "@/components/friendship/AddFriendView.tsx";

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
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {/* Minimalist Users SVG */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                        Friends
                    </h1>
                </div>

                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors active:scale-[0.98]"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {/* Minimalist Left Chevron SVG */}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Profile
                </button>
            </div>

            {/* Main Tabs and List Interface */}
            <div
                className="px-4 py-4 rounded-2xl border"
                style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
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