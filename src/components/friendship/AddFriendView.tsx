import { useState } from 'react';
import { Avatar, Card, SegmentedControl } from '@/components/ui';
import { useMe } from '@/hooks/useMe';
import { ManualAddTab } from './ManualAddTab';
import { ScanQrTab } from './ScanQrTab';
import { ShowQrTab } from './ShowQrTab';

type AddTab = 'manual' | 'scan' | 'show';

interface AddFriendViewProps {
    onSend: (params: { targetUsername: string; targetDiscriminator: string }) => Promise<void>;
}

export const AddFriendView = ({ onSend }: AddFriendViewProps) => {
    const { profile } = useMe();
    const [tab, setTab] = useState<AddTab>('manual');

    return (
        <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card variant="elevated">
                <Card.Body className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-(--color-muted)">Your username</p>
                    <div className="flex items-center gap-3">
                        <Avatar
                            size="md"
                            src={profile?.avatarUrl ?? undefined}
                            fallback={profile?.username ?? '?'}
                        />
                        <div>
                            <p className="font-bold text-(--color-text)">{profile?.username}</p>
                            <p className="text-xs font-mono text-(--color-muted)">#{profile?.discriminator}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>

            <SegmentedControl
                fullWidth
                value={tab}
                onChange={setTab}
                options={[
                    { label: 'By Username', value: 'manual' },
                    { label: 'Scan QR', value: 'scan' },
                    { label: 'My QR', value: 'show' },
                ]}
            />

            {tab === 'manual' && <ManualAddTab onSend={onSend} />}
            {tab === 'scan' && <ScanQrTab onSend={onSend} />}
            {tab === 'show' && <ShowQrTab />}
        </div>
    );
};