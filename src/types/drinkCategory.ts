import {Beer, Droplet, GlassWater, type LucideIcon, Martini, Wine} from 'lucide-react';

export type DrinkCategory = 'BEER' | 'COCKTAIL' | 'WINE' | 'SPIRITS' | 'OTHER';

export const drinkCategoryConfig: Record<DrinkCategory, {
    label: string;
    icon: LucideIcon;
    color: string;
}> = {
    BEER: {
        label: 'Beer',
        icon: Beer,
        color: 'text-amber-600'
    },
    COCKTAIL: {
        label: 'Cocktail',
        icon: Martini,
        color: 'text-pink-600'
    },
    WINE: {
        label: 'Wine',
        icon: Wine,
        color: 'text-purple-600'
    },
    SPIRITS: {
        label: 'Spirits',
        icon: GlassWater,
        color: 'text-orange-600'
    },
    OTHER: {
        label: 'Other',
        icon: Droplet,
        color: 'text-slate-600'
    }
};