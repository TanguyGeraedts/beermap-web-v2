import { Button, Card } from '@/components/ui';
import { useMe } from '@/hooks/useMe';

export const ShowQrTab = () => {
    const { profile } = useMe();

    return (
        <Card variant="muted" className="border-dashed border-2 opacity-60">
            <Card.Body className="flex flex-col items-center py-12 space-y-3">
                <div className="w-40 h-40 rounded-xl bg-(--color-muted)/20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-(--color-muted)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75V16.5zM16.5 6.75h.75v.75h-.75v-.75z" />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="font-semibold text-(--color-text)">{profile?.username} #{profile?.discriminator}</p>
                    <p className="text-xs text-(--color-muted) mt-1">Let friends scan this to add you instantly</p>
                </div>
                <Button size="sm" variant="ghost" disabled>Coming soon</Button>
            </Card.Body>
        </Card>
    );
};