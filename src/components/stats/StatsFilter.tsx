import { Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui";
import { type DrinkCategory, drinkCategoryConfig } from "@/types";

export type StatsFilterCategory = 'ALL' | DrinkCategory;

interface StatsFilterProps {
    value: StatsFilterCategory;
    onChange: (type: StatsFilterCategory) => void;
}

export const StatsFilter = ({ value, onChange }: StatsFilterProps) => {
    const categories: StatsFilterCategory[] = ['ALL', 'BEER', 'COCKTAIL', 'WINE', 'SPIRITS', 'OTHER'];

    const getCategoryConfig = (category: StatsFilterCategory) => {
        if (category === 'ALL') {
            return {
                label: 'All',
                icon: Sparkles
            };
        }
        return {
            label: drinkCategoryConfig[category].label,
            icon: drinkCategoryConfig[category].icon
        };
    };

    return (
        <div>
            <label className="block text-sm font-medium text-(--color-text) mb-3">
                Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const config = getCategoryConfig(category);
                    const Icon = config.icon;
                    const isActive = category === value;

                    return (
                        <button
                            key={category}
                            onClick={() => onChange(category)}
                            className="p-0"
                        >
                            <Badge
                                variant={isActive ? 'primary' : 'default'}
                                size="md"
                                className="gap-2 cursor-pointer"
                            >
                                <Icon size={16} />
                                <span>{config.label}</span>
                            </Badge>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};