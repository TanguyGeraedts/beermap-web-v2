import { Card } from '@/components/ui';
import { useMe } from '@/hooks/useMe';
import { QRCodeSVG } from 'qrcode.react';

export const ShowQrTab = () => {
    const { profile } = useMe();

    if (!profile) return null;

    const qrValue = JSON.stringify({
        username: profile.username,
        discriminator: profile.discriminator,
    });

    return (
        <Card variant="elevated">
            <Card.Body className="flex flex-col items-center py-8 space-y-4">
                <div className="p-5 bg-white rounded-3xl shadow-lg">
                    <QRCodeSVG
                        value={qrValue}
                        size={200}
                        level="H"
                        marginSize={1}
                    />
                </div>
                <p className="text-xs text-(--color-muted) text-center">
                    Let a friend scan this to send you a friend request instantly
                </p>
            </Card.Body>
        </Card>
    );
};