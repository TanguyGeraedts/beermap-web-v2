import React from 'react';
import { Card } from '@/components/ui';
import { UserRankPill } from '@/components/ui/components/UserRankPill';

export const UserRankPillDisplay = () => {
    const examples = [
        { name: 'tanguy', type: 'ADMIN' as const },
        { name: 'tanguy', type: 'PREMIUM' as const },
        { name: 'tanguy', type: 'NORMAL' as const },
    ];

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                UserRankPill
            </h2>

            <Card variant="default">
                <Card.Body className="space-y-8">
                    <div>
                        <p className="text-sm text-(--color-muted) mb-4">Variants</p>
                        <div className="flex items-center gap-4">
                            <UserRankPill accountType="ADMIN" />
                            <UserRankPill accountType="PREMIUM" />
                            <UserRankPill accountType="ADMIN" compact />
                            <UserRankPill accountType="PREMIUM" compact />
                        </div>
                    </div>

                    <div className="border-t border-(--color-border) pt-6">
                        <p className="text-sm text-(--color-muted) mb-6">
                            Comparison: Full vs Compact
                        </p>

                        <div className="grid grid-cols-[1fr_auto_1fr] gap-x-12 gap-y-6 items-center max-w-xl">
                            {examples.map((user) => (
                                <React.Fragment key={user.name}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-(--color-text)">
                                            {user.name}
                                        </span>
                                        <UserRankPill accountType={user.type} />
                                    </div>

                                    <div className="h-4 w-px bg-gray-200" aria-hidden="true" />

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-(--color-text)">
                                            {user.name}
                                        </span>
                                        <UserRankPill accountType={user.type} compact />
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};