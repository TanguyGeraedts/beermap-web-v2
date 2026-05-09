import { Badge, Card } from '@/components/ui';

export const BadgeDisplay = () => {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Badge
            </h2>
            <Card variant="default">
                <Card.Body>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                            <Badge variant="default">Default</Badge>
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="danger">Danger</Badge>
                        </div>

                        <div className="border-t border-(--color-border) pt-4">
                            <p className="text-sm text-(--color-muted) mb-3">
                                Sizes: sm, md
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="primary" size="sm">
                                    Small
                                </Badge>
                                <Badge variant="primary" size="md">
                                    Medium
                                </Badge>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};