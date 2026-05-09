import { Button, Card } from '@/components/ui';

export const CardDisplay = () => {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Card
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default">
                    <Card.Header>
                        <h3 className="font-semibold text-(--color-text)">
                            Default Card
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-sm text-(--color-muted)">
                            This is a default card variant.
                        </p>
                    </Card.Body>
                </Card>

                <Card variant="muted">
                    <Card.Header>
                        <h3 className="font-semibold text-(--color-text)">
                            Muted Card
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-sm text-(--color-muted)">
                            This is a muted card variant.
                        </p>
                    </Card.Body>
                </Card>

                <Card variant="elevated">
                    <Card.Header>
                        <h3 className="font-semibold text-(--color-text)">
                            Elevated Card
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-sm text-[var(--color-muted)]">
                            This is an elevated card variant.
                        </p>
                    </Card.Body>
                </Card>
            </div>

            <Card variant="default">
                <Card.Header>
                    <h3 className="font-semibold text-(--color-text)">
                        Card with Footer
                    </h3>
                </Card.Header>
                <Card.Body>
                    <p className="text-sm text-(--color-muted)">
                        Cards can have headers, bodies, and footers.
                    </p>
                </Card.Body>
                <Card.Footer>
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm">
                            Action
                        </Button>
                        <Button variant="secondary" size="sm">
                            Cancel
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </section>
    );
};