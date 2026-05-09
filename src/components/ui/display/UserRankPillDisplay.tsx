import { Card } from '@/components/ui';
import { UserRankPill } from '@/components/ui/components/UserRankPill';

export const UserRankPillDisplay = () => {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                UserRankPill
            </h2>
            <Card variant="default">
                <Card.Body className="space-y-6">
                    <div>
                        <p className="text-sm text-(--color-muted) mb-4">
                            Variants
                        </p>
                        <div className="flex items-center gap-4">
                            <UserRankPill accountType="ADMIN" />
                            <UserRankPill accountType="PREMIUM" />
                            <UserRankPill accountType="NORMAL" />
                            <span className="text-xs text-(--color-muted) italic">
              </span>
                        </div>
                    </div>

                    <div className="border-t border-(--color-border) pt-4">
                        <p className="text-sm text-(--color-muted) mb-4">
                            In context (next to a username)
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-(--color-text)">tanguy</span>
                                <UserRankPill accountType="ADMIN" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-(--color-text)">tanguy</span>
                                <UserRankPill accountType="PREMIUM" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-(--color-text)">tanguy</span>
                                <UserRankPill accountType="NORMAL" />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};