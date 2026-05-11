import { Button, Card } from '@/components/ui';

export const ScanQrTab = () => (
    <Card variant="muted" className="border-dashed border-2 opacity-60">
        <Card.Body className="flex flex-col items-center py-12 space-y-3">
            <div className="w-24 h-24 rounded-lg bg-(--color-muted)/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-(--color-muted)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
            </div>
            <div className="text-center">
                <p className="font-semibold text-(--color-text)">Scan a QR Code</p>
                <p className="text-xs text-(--color-muted) mt-1">Point your camera at a friend's QR code to add them instantly</p>
            </div>
            <Button size="sm" variant="ghost" disabled>Open Camera</Button>
        </Card.Body>
    </Card>
);