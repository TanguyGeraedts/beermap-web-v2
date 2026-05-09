import { useState } from 'react';
import { Button, Card } from '@/components/ui';

export const ButtonDisplay = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Button
            </h2>
            <Card variant="default">
                <Card.Body>
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="danger">Danger</Button>
                        </div>

                        <div className="border-t border-(--color-border) pt-4">
                            <p className="text-sm text-(--color-muted) mb-4">
                                Sizes: sm, md, lg
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary" size="sm">
                                    Small
                                </Button>
                                <Button variant="primary" size="md">
                                    Medium
                                </Button>
                                <Button variant="primary" size="lg">
                                    Large
                                </Button>
                            </div>
                        </div>

                        <div className="border-t border-(--color-border) pt-4">
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary" disabled>
                                    Disabled
                                </Button>
                                <Button
                                    variant="primary"
                                    isLoading={isLoading}
                                    onClick={() => {
                                        setIsLoading(true);
                                        setTimeout(() => setIsLoading(false), 2000);
                                    }}
                                >
                                    Loading
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};