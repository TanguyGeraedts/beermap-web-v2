import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from "@/hooks/useMe";
import { useMeStats } from "@/hooks/useMeStats";
import { StatsFilter, type StatsFilterCategory } from "@/components/stats/StatsFilter";
import { StatsCard } from "@/components/stats/StatsCard";
import { Button } from '@/components/ui';
import { BarChart2, ChevronLeft } from 'lucide-react';

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
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <BarChart2 size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Statistics</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="rounded-xl"
                >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    Profile
                </Button>
            </div>

            <StatsFilter value={selectedCategory} onChange={setSelectedCategory} />
            <StatsCard selectedCategory={selectedCategory} stats={stats} />

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