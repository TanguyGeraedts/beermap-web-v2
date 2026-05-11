import { useState } from 'react';
import { SegmentedControl } from '@/components/ui';
import { ManualAddTab } from './ManualAddTab';
import { ScanQrTab } from './ScanQrTab';
import { ShowQrTab } from './ShowQrTab';

type AddTab = 'manual' | 'scan' | 'show';

interface AddFriendViewProps {
    onSend: (params: { targetUsername: string; targetDiscriminator: string }) => Promise<void>;
}

export const AddFriendView = ({ onSend }: AddFriendViewProps) => {
    const [tab, setTab] = useState<AddTab>('manual');

    return (
        <div className="space-y-4 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
            {tab === 'scan' && <ScanQrTab />}
            {tab === 'show' && <ShowQrTab />}
        </div>
    );
};