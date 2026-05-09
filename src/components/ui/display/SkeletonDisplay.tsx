import { Card, Skeleton } from '@/components/ui';

export const SkeletonDisplay = () => {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Skeleton
            </h2>
            <Card variant="default">
                <Card.Body className="space-y-4">
                    <div>
                        <p className="text-sm text-(--color-muted) mb-3">
                            Loading placeholders
                        </p>
                        <Skeleton width="w-full" height="h-4" rounded="md" />
                    </div>

                    <div>
                        <p className="text-sm text-(--color-muted) mb-3">
                            Avatar placeholder
                        </p>
                        <Skeleton width="w-12" height="h-12" rounded="full" />
                    </div>

                    <div>
                        <p className="text-sm text-(--color-muted) mb-3">
                            Card placeholder
                        </p>
                        <div className="space-y-3">
                            <Skeleton width="w-full" height="h-6" rounded="md" />
                            <Skeleton width="w-5/6" height="h-4" rounded="md" />
                            <Skeleton width="w-4/6" height="h-4" rounded="md" />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};