import { useState } from 'react';
import { Avatar, Button, Card, DiscriminatorInput, Input, Alert } from '@/components/ui';

interface AddFriendViewProps {
    onSend: (params: { targetUsername: string; targetDiscriminator: string }) => Promise<void>;
}

export const AddFriendView = ({ onSend }: AddFriendViewProps) => {
    const [username, setUsername] = useState('');
    const [discriminator, setDiscriminator] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleRequest = async () => {
        if (!username || discriminator.length < 4) return;

        setIsSubmitting(true);
        setStatus(null);

        try {
            await onSend({
                targetUsername: username,
                targetDiscriminator: discriminator
            });

            setStatus({ type: 'success', message: 'Friend request sent!' });
            setUsername('');
            setDiscriminator('');
        } catch (err: any) {
            setStatus({
                type: 'error',
                message: err.response?.data?.message || 'Failed to send request. Check the username and code.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Live Preview Card */}
            <Card variant="muted" className="border-dashed border-2">
                <Card.Body className="flex flex-col items-center py-6 space-y-3">
                    <Avatar
                        size="xl"
                        fallback={username || "Preview"}
                        className="shadow-md"
                    />
                    <div className="text-center">
                        <p className="font-bold text-lg text-(--color-text)">
                            {username || "Username"}
                        </p>
                        <p className="text-sm font-mono text-(--color-muted)">
                            #{discriminator.padEnd(4, '_')}
                        </p>
                    </div>
                </Card.Body>
            </Card>

            <Card variant="elevated">
                <Card.Body className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h3 className="font-semibold text-lg text-(--color-text)">Add a Friend</h3>
                        <p className="text-sm text-(--color-muted)">
                            Enter the unique username and 4-digit code.
                        </p>
                    </div>

                    {status && (
                        <Alert
                            variant={status.type}
                            onClose={() => setStatus(null)}
                        >
                            {status.message}
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <Input
                            label="Username"
                            placeholder="e.g. tanguy"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="off"
                        />

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-(--color-text)">Code</label>
                            <div className="flex justify-center">
                                <DiscriminatorInput
                                    value={discriminator}
                                    onChange={setDiscriminator}
                                />
                            </div>
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
        </div>
    );
};