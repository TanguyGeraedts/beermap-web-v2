import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from "@/hooks/useMe";
import { useMeStats } from "@/hooks/useMeStats";
import { StatsFilter, type StatsFilterCategory } from "@/components/stats/StatsFilter";
import { StatsCard } from "@/components/stats/StatsCard";

export const StatsPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<StatsFilterCategory>('ALL');

    const { isLoading: isUserLoading } = useMe();
    const { data: stats, isLoading: isStatsLoading, isError } = useMeStats();

    if (isUserLoading || isStatsLoading) {
        return (
            <div className="space-y-4">
                <div className="rounded-xl h-12 animate-pulse" style={{ background: 'var(--color-surface)' }} />
                <div className="rounded-2xl h-64 animate-pulse" style={{ background: 'var(--color-surface)' }} />
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="p-4 rounded-xl text-center text-sm font-medium border border-red-200/20 bg-red-500/10 text-red-500">
                Failed to load statistics.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {/* Minimalist Bar Chart SVG */}
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
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                        Statistics
                    </h1>
                </div>

                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors active:scale-[0.98]"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {/* Minimalist Arrow Left SVG */}
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
                    Profile
                </button>
            </div>

            {/* Core Filter & Cards */}
            <StatsFilter value={selectedCategory} onChange={setSelectedCategory} />
            <StatsCard selectedCategory={selectedCategory} stats={stats} />

            {/* Additional Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                    className="rounded-2xl p-4 border"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-muted)' }}>
                        Total Statistics
                    </h3>
                    <p className="text-xl font-bold leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                        {stats.totals.totalDrinks} drinks
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        Across {stats.totals.totalEntries} entries in {stats.totals.activeDays} days
                    </p>
                </div>

                <div
                    className="rounded-2xl p-4 border"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-muted)' }}>
                        Peak Hour
                    </h3>
                    <p className="text-xl font-bold leading-tight mb-1" style={{ color: 'var(--color-text)' }}>
                        {stats.time.peakHour}:00
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        Your most active drinking hour
                    </p>
                </div>
            </div>
        </div>
    );
};