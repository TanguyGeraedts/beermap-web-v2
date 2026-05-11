import { useState } from 'react';
import { useFriendships } from '@/hooks/useFriendships';
import { Avatar, Button, Card, DiscriminatorInput, Input } from '@/components/ui';
import { FriendshipHeader, FriendTab } from "@/components/friendship/FriendshipHeader.tsx";

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
                    <Card key={item.id} variant="muted">
                        <Card.Body className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar
                                    fallback={item.user?.username || item.requesterId}
                                    src={item.user?.avatarUrl}
                                />
                                <div>
                                    <p className="font-bold">
                                        {item.user?.username || `User ${item.requesterId?.slice(0, 4)}...`}
                                    </p>
                                    <p className="text-xs text-(--color-muted)">
                                        {item.user?.discriminator ? `#${item.user.discriminator}` : item.status}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                {tab === 'received' && (
                                    <Button
                                        size="sm"
                                        onClick={() => actions.accept({ userId: item.user?.id || item.requesterId })}
                                    >
                                        Accept
                                    </Button>
                                )}

                                {tab === 'friends' && (
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => actions.remove(item.id)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
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
            {isLoading ? <div className="py-10 text-center">Loading...</div> : renderContent()}
        </main>
    );
};

/**
 * THE ADD FRIEND COMPONENT (Defined in the same file)
 */
const AddFriendView = ({ onSend }: { onSend: any }) => {
    const [username, setUsername] = useState('');
    const [discriminator, setDiscriminator] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRequest = async () => {
        if (!username || discriminator.length < 4) return;
        setIsSubmitting(true);
        try {
            await onSend({ targetUsername: username, targetDiscriminator: discriminator });
            setUsername('');
            setDiscriminator('');
            alert("Friend request sent!");
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card variant="elevated" className="mt-4">
            <Card.Body className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Add by Username</h3>
                    <p className="text-sm text-(--color-muted)">
                        Enter the username and the 4-digit code.
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Username"
                        placeholder="e.g. tanguy"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-(--color-text)">Code</label>
                        <DiscriminatorInput
                            value={discriminator}
                            onChange={setDiscriminator}
                        />
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleRequest}
                        isLoading={isSubmitting}
                        disabled={!username || discriminator.length < 4}
                    >
                        Send Friend Request
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};