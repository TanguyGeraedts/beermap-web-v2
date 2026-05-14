import {Card, VersionPill} from '@/components/ui';

export const VersionPillDisplay = () => {
    return (
        <section className="space-y-4">
            <div className="flex items-end justify-between">
                <h2 className="text-2xl font-semibold text-(--color-text)">
                    VersionPill
                </h2>
                <span className="text-xs text-(--color-muted) italic">Clickable Component</span>
            </div>

            <Card variant="default">
                <Card.Body className="space-y-8">
                    <div>
                        <p className="text-sm text-(--color-muted) mb-4">Interactive States</p>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-gray-400 uppercase">Interactive Pill</span>
                                <VersionPill />
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-gray-400 uppercase">Hidden Icon</span>
                                <VersionPill showIcon={false} />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-(--color-border) pt-6">
                        <p className="text-sm text-(--color-muted) mb-6">
                            Common Usage (Footer / Sidebar)
                        </p>

                        <div className="space-y-4 max-w-xl">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">System Status</span>
                                    <span className="text-xs text-slate-500">All systems operational</span>
                                </div>
                                <VersionPill />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};