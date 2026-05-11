import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMe } from "@/hooks/useMe";
import { useMeStats } from "@/hooks/useMeStats";
import { Button } from "@/components/ui";
import { ChevronLeft } from 'lucide-react';
import { StatsFilter, type StatsFilterCategory } from "@/components/stats/StatsFilter";
import { StatsCard } from "@/components/stats/StatsCard";

export const StatsPage = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<StatsFilterCategory>('ALL');

    const { isLoading: isUserLoading } = useMe();
    const { data: stats, isLoading: isStatsLoading, isError } = useMeStats();

    if (isUserLoading || isStatsLoading) {
        return (
            <main className="grid min-h-dvh place-items-center p-6 text-(--color-muted)">
                Loading stats...
            </main>
        );
    }

    if (isError || !stats) {
        return (
            <main className="grid min-h-dvh place-items-center p-6 text-red-500">
                Failed to load statistics.
            </main>
        );
    }

    return (
        <main className="min-h-dvh p-6">
            <div className="max-w-md mx-auto space-y-6">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/profile')}
                        className="gap-2 px-0 hover:bg-transparent"
                    >
                        <ChevronLeft size={20}/>
                        Back to Profile
                    </Button>
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-(--color-text) mb-2">
                        Your Drinking Stats
                    </h1>
                    <p className="text-(--color-muted) text-sm mb-6">
                        Track your drinking habits across different categories
                    </p>
                </div>

                <StatsFilter value={selectedCategory} onChange={setSelectedCategory} />

                <StatsCard selectedCategory={selectedCategory} stats={stats} />

                {/* Additional Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="rounded-lg border p-6 bg-(--color-surface) border-(--color-border)">
                        <h3 className="text-sm font-medium text-(--color-muted) mb-2">
                            Total Statistics
                        </h3>
                        <p className="text-2xl font-bold text-(--color-text) mb-4">
                            {stats.totals.totalDrinks} drinks
                        </p>
                        <p className="text-sm text-(--color-muted)">
                            Across {stats.totals.totalEntries} entries in {stats.totals.activeDays} days
                        </p>
                    </div>

                    <div className="rounded-lg border p-6 bg-(--color-surface) border-(--color-border)">
                        <h3 className="text-sm font-medium text-(--color-muted) mb-2">
                            Peak Hour
                        </h3>
                        <p className="text-2xl font-bold text-(--color-text) mb-4">
                            {stats.time.peakHour}:00
                        </p>
                        <p className="text-sm text-(--color-muted)">
                            Your most active drinking hour
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};