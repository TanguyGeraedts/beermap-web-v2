import { SegmentedControl } from '@/components/ui';

export type FriendTab = 'friends' | 'received' | 'sent' | 'add';

interface FriendshipHeaderProps {
    activeTab: FriendTab;
    onTabChange: (tab: any) => void;
    counts: {
        friends: number;
        received: number;
    };
}

export const FriendshipHeader = ({ activeTab, onTabChange, counts }: FriendshipHeaderProps) => {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold px-1">Social</h1>
            <SegmentedControl
                fullWidth
                value={activeTab}
                onChange={onTabChange}
                options={[
                    { label: `Friends (${counts.friends})`, value: 'friends' },
                    { label: `Requests (${counts.received})`, value: 'received' },
                    { label: 'Sent', value: 'sent' },
                    { label: 'Add', value: 'add' },
                ]}
            />
        </div>
    );
};