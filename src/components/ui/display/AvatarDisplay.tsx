import { Avatar, Card } from '@/components/ui';

export const AvatarDisplay = () => {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-(--color-text)">
                Avatar
            </h2>
            <Card variant="default">
                <Card.Body className="space-y-6">
                    <div>
                        <p className="text-sm text-(--color-muted) mb-4">
                            Sizes: xs, sm, md, lg, xl
                        </p>
                        <div className="flex items-center gap-4">
                            <Avatar size="xs" fallback="John Doe" />
                            <Avatar size="sm" fallback="John Doe" />
                            <Avatar size="md" fallback="John Doe" />
                            <Avatar size="lg" fallback="John Doe" />
                            <Avatar size="xl" fallback="John Doe" />
                        </div>
                    </div>

                    <div className="border-t border-(--color-border) pt-4">
                        <p className="text-sm text-(--color-muted) mb-4">
                            With image
                        </p>
                        <div className="flex items-center gap-4">
                            <Avatar
                                src="https://i.pravatar.cc/150?img=1"
                                alt="User avatar"
                                size="md"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/150?img=2"
                                alt="User avatar"
                                size="lg"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/150?img=3"
                                alt="User avatar"
                                size="xl"
                            />
                        </div>
                    </div>

                    <div className="border-t border-(--color-border) pt-4">
                        <p className="text-sm text-(--color-muted) mb-4">
                            Fallback states
                        </p>
                        <div className="flex items-center gap-4">
                            {/* Image that will fail → shows initials */}
                            <Avatar
                                src="https://broken-url.com/image.jpg"
                                alt="Broken image"
                                fallback="Tanguy Guns"
                                size="md"
                            />
                            {/* No src → shows initials */}
                            <Avatar fallback="Tanguy Guns" size="md" />
                            {/* No src, no fallback → shows generic icon */}
                            <Avatar size="md" />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    );
};