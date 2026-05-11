import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Card } from '@/components/ui';
import { Html5Qrcode } from 'html5-qrcode';

interface ScanQrTabProps {
    onSend: (params: { targetUsername: string; targetDiscriminator: string }) => Promise<void>;
}

export const ScanQrTab = ({ onSend }: ScanQrTabProps) => {
    const [scanning, setScanning] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const containerId = 'qr-scanner-container';

    const startScanning = async () => {
        setStatus(null);
        setScanning(true);

        const scanner = new Html5Qrcode(containerId);
        scannerRef.current = scanner;

        try {
            await scanner.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                async (decodedText) => {
                    await stopScanning();

                    try {
                        const { username, discriminator } = JSON.parse(decodedText);

                        if (!username || !discriminator) {
                            setStatus({ type: 'error', message: 'Invalid QR code.' });
                            return;
                        }

                        await onSend({ targetUsername: username, targetDiscriminator: discriminator });
                        setStatus({ type: 'success', message: `Friend request sent to ${username}!` });
                    } catch {
                        setStatus({ type: 'error', message: 'Could not read QR code. Make sure it\'s a valid friend code.' });
                    }
                },
                () => {}
            );
        } catch {
            setScanning(false);
            setStatus({ type: 'error', message: 'Could not access camera. Please check permissions.' });
        }
    };

    const stopScanning = async () => {
        if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
            scannerRef.current.clear();
        }
        setScanning(false);
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current.stop().catch(() => {});
            }
        };
    }, []);

    return (
        <Card variant="elevated">
            <Card.Body className="flex flex-col items-center py-8 space-y-4">
                {status && (
                    <Alert variant={status.type} onClose={() => setStatus(null)}>
                        {status.message}
                    </Alert>
                )}

                <div
                    id={containerId}
                    className={scanning ? 'w-full rounded-xl overflow-hidden' : 'hidden'}
                />

                {!scanning && (
                    <div className="flex flex-col items-center space-y-3">
                        <div className="w-24 h-24 rounded-lg bg-(--color-muted)/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-(--color-muted)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-(--color-text)">Scan a QR Code</p>
                            <p className="text-xs text-(--color-muted) mt-1">Point your camera at a friend's QR code</p>
                        </div>
                    </div>
                )}

                <Button
                    className="w-full"
                    variant={scanning ? 'ghost' : 'primary'}
                    onClick={scanning ? stopScanning : startScanning}
                >
                    {scanning ? 'Stop Scanning' : 'Open Camera'}
                </Button>
            </Card.Body>
        </Card>
    );
};