import { useChangelog } from '@/hooks/useMeta';
import { useNavigate } from 'react-router-dom';
import { ChangelogItem } from "@/components/meta/ChangelogItem.tsx";
import { Button } from '@/components/ui';
import { History, ChevronLeft } from 'lucide-react';

export const ChangelogPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, refetch } = useChangelog();

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <History size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Changelog</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="rounded-xl"
                >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    Back
                </Button>
            </div>

            {isLoading && (
                <div className="space-y-3">
                    <div className="rounded-2xl h-32 animate-pulse" style={{ background: 'var(--color-surface)' }} />
                    <div className="rounded-2xl h-32 animate-pulse" style={{ background: 'var(--color-surface)' }} />
                </div>
            )}

            {isError && (
                <div
                    className="p-6 text-center rounded-2xl border flex flex-col items-center justify-center gap-3"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                    <p className="text-sm font-medium" style={{ color: '#ef4444' }}>Failed to load version history</p>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => refetch()}
                        className="rounded-xl"
                    >
                        Try Again
                    </Button>
                </div>
            )}

            {data && (
                <div className="space-y-3">
                    {data.entries.map((entry, index) => (
                        <div
                            key={entry.version}
                            className="p-4 rounded-2xl border"
                            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                        >
                            <ChangelogItem entry={entry} isLatest={index === 0} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};