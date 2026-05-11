import { useMemo } from 'react';
import type { MeStatsResponse, DrinkCategory } from "@/types";
import type { StatsFilterCategory } from "./StatsFilter";

interface Stat {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
}

interface StatsCardProps {
    selectedCategory: StatsFilterCategory;
    stats: MeStatsResponse;
}

export const StatsCard = ({ selectedCategory, stats }: StatsCardProps) => {
    const displayStats = useMemo((): Stat[] => {
        if (selectedCategory === 'ALL') {
            return [
                {
                    label: 'Total Drinks',
                    value: stats.totals.totalDrinks,
                },
                {
                    label: 'Total Entries',
                    value: stats.totals.totalEntries,
                },
                {
                    label: 'Active Days',
                    value: stats.totals.activeDays,
                },
                {
                    label: 'Favorite',
                    value: stats.favorites.favoriteDrinkOverall?.name ?? 'None',
                }
            ];
        }

        const categoryStats = stats.categories.drinksByCategory.find(
            (cat) => cat.category === selectedCategory as DrinkCategory
        );

        const categoryEntries = stats.categories.entriesByCategory.find(
            (cat) => cat.category === selectedCategory as DrinkCategory
        );

        return [
            {
                label: 'Total Drinks',
                value: categoryStats?.drinks ?? 0,
            },
            {
                label: 'Total Entries',
                value: categoryEntries?.drinks ?? 0,
            },
            {
                label: 'Active Days',
                value: stats.totals.activeDays,
            },
            {
                label: 'Current Streak',
                value: stats.time.streak,
            }
        ];
    }, [selectedCategory, stats]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayStats.map((stat) => (
                <div
                    key={stat.label}
                    className={`
                        rounded-lg border p-6
                        bg-(--color-surface)
                        border-(--color-border)
                        hover:shadow-md transition-shadow duration-200
                    `}
                >
                    <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-sm font-medium text-(--color-muted)">
                            {stat.label}
                        </h3>
                        {stat.trend && (
                            <span
                                className={`
                                    text-xs font-semibold
                                    ${stat.trend === 'up' ? 'text-green-600' : ''}
                                    ${stat.trend === 'down' ? 'text-red-600' : ''}
                                    ${stat.trend === 'neutral' ? 'text-(--color-muted)' : ''}
                                `}
                            >
                                {stat.trend === 'up' && '↑ '}
                                {stat.trend === 'down' && '↓ '}
                                {stat.change}
                            </span>
                        )}
                    </div>
                    <p className="text-2xl font-bold text-(--color-text)">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};