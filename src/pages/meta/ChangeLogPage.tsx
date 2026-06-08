import { useChangelog } from '@/hooks/useMeta';
import { useNavigate } from 'react-router-dom';
import { ChangelogItem } from "@/components/meta/ChangelogItem.tsx";

export const ChangelogPage = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError, refetch } = useChangelog();

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {/* Minimalist Clock/History SVG matching JournalIcon dimensions */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M12 7v5l4 2" />
                    </svg>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Changelog</h1>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {/* Minimalist Left Chevron SVG */}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back
                </button>
            </div>

            {/* Content States */}
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
                    <button
                        onClick={() => refetch()}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                        style={{ background: 'var(--color-surface-muted)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                    >
                        Try Again
                    </button>
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
                            <ChangelogItem
                                entry={entry}
                                isLatest={index === 0}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};