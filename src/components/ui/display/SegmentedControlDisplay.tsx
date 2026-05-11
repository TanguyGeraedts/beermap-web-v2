import { useState } from 'react';
import {Card, SegmentedControl} from '@/components/ui';
import type { DrinkCategory } from '@/types';

export const SegmentedControlDisplay = () => {
    // State for Drink Categories
    const [category, setCategory] = useState<DrinkCategory>('BEER');

    // State for Friends Menu
    const [friendTab, setFriendTab] = useState('friends');

    const DRINK_OPTIONS: { label: string; value: DrinkCategory }[] = [
        { label: 'Beer', value: 'BEER' },
        { label: 'Wine', value: 'WINE' },
        { label: 'Spirits', value: 'SPIRITS' },
        { label: 'Other', value: 'OTHER' }
    ];

    const FRIEND_TABS = [
        { label: 'Friends', value: 'friends' },
        { label: 'Requests', value: 'requests' },
        { label: 'Received', value: 'received' }
    ];

    return (
        <section className="space-y-8 p-6">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Segmented Control
            </h2>

            {/* Example 1: Full Width (Log/Stats style) */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-(--color-muted)">Drink Selection (Full Width)</h3>
                <Card>
                    <Card.Body className="space-y-4">
                        <SegmentedControl
                            options={DRINK_OPTIONS}
                            value={category}
                            onChange={setCategory}
                            fullWidth
                        />
                        <p className="text-sm text-center">
                            Viewing stats for: <span className="font-bold text-(--color-primary)">{category}</span>
                        </p>
                    </Card.Body>
                </Card>
            </div>

            {/* Example 2: Fit Content (Friends/Settings style) */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-(--color-muted)">Friends Menu (Fit Content)</h3>
                <div className="flex flex-col gap-4">
                    <SegmentedControl
                        options={FRIEND_TABS}
                        value={friendTab}
                        onChange={setFriendTab}
                    />

                    <div className="p-4 rounded-lg bg-(--color-surface-muted) border border-(--color-border)">
                        Showing content for tab: <span className="font-bold">{friendTab}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};