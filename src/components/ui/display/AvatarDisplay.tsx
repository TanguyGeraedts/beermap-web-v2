import { Card, Avatar } from '@/components/ui';

export const AvatarDisplay = () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Avatar
            </h2>
            <Card variant="default">
                <Card.Body>
                    <div>
                        <p className="text-sm text-(--color-muted) mb-8">
                            Sizes: xs, sm, md, lg, xl (DiceBear Fallback)
                        </p>

                        <div className="flex items-end gap-6">
                            {sizes.map((size) => (
                                <div key={size} className="flex flex-col items-center gap-3">
                                    <Avatar
                                        size={size}
                                        fallback="Tanguy"
                                    />
                                    <span className="text-xs text-(--color-muted) font-mono uppercase">
                                        {size}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};