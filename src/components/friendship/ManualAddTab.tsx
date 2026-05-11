import { useState } from 'react';
import { Alert, Button, Card, DiscriminatorInput, Input } from '@/components/ui';

interface ManualAddTabProps {
    onSend: (params: { targetUsername: string; targetDiscriminator: string }) => Promise<void>;
}

export const ManualAddTab = ({ onSend }: ManualAddTabProps) => {
    const [username, setUsername] = useState('');
    const [discriminator, setDiscriminator] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleRequest = async () => {
        if (!username || discriminator.length < 4) return;

        setIsSubmitting(true);
        setStatus(null);

        try {
            await onSend({ targetUsername: username, targetDiscriminator: discriminator });
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
        <Card variant="elevated">
            <Card.Body className="space-y-6">
                <div className="space-y-2 text-center">
                    <h3 className="font-semibold text-lg text-(--color-text)">Add a Friend</h3>
                    <p className="text-sm text-(--color-muted)">Enter the unique username and 4-digit code.</p>
                </div>

                {status && (
                    <Alert variant={status.type} onClose={() => setStatus(null)}>
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
                            <DiscriminatorInput value={discriminator} onChange={setDiscriminator} />
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
    );
};