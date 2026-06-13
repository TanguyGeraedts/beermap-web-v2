import L from 'leaflet';
import {DrinkCategory, drinkCategoryConfig} from "@/types";
export type PinVariant = 'default' | 'selected' | 'cluster';

export interface DrinkPinOptions {
    variant?: PinVariant;
    color?: string;
    count?: number;
}

const DEFAULT_COLOR = '#64748b';

const TAILWIND_HEX_MAP: Record<string, string> = {
    'text-amber-600':   '#d97706', // BEER
    'text-pink-600':    '#db2777', // COCKTAIL
    'text-purple-600':  '#9333ea', // WINE
    'text-orange-600':  '#ea580c', // SPIRITS
    'text-slate-600':   '#475569', // OTHER
};

export function getCategoryColor(category: string): string {
    const upperCategory = category?.toUpperCase() as DrinkCategory;
    const config = drinkCategoryConfig[upperCategory];

    if (!config) return DEFAULT_COLOR;

    return TAILWIND_HEX_MAP[config.color] ?? DEFAULT_COLOR;
}

export function createDrinkPin(category: string, options: DrinkPinOptions = {}): L.DivIcon {
    const { variant = 'default', color } = options;
    const fill = color ?? getCategoryColor(category);

    const isSelected = variant === 'selected';
    const size = isSelected ? 26 : 20;
    const border = isSelected ? '3px solid white' : '2px solid white';
    const shadow = isSelected
        ? '0 0 0 3px ' + fill + '55, 0 3px 12px rgba(0,0,0,0.35)'
        : '0 2px 8px rgba(0,0,0,0.28)';

    return L.divIcon({
        className: 'beermap-leaflet-pin-shell',
        html: `
            <span style="
                display:block;
                width:${size}px;
                height:${size}px;
                border-radius:999px;
                background:${fill};
                border:${border};
                box-shadow:${shadow};
                transition:transform 0.15s ease;
            "></span>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2 + 6)],
    });
}

export function createClusterPin(count: number, dominantCategory: string): L.DivIcon {
    const fill = getCategoryColor(dominantCategory);
    const size = count >= 100 ? 48 : count >= 20 ? 40 : 32;

    return L.divIcon({
        className: 'beermap-leaflet-pin-shell',
        html: `
            <span style="
                display:flex;
                align-items:center;
                justify-content:center;
                width:${size}px;
                height:${size}px;
                border-radius:999px;
                background:${fill};
                border:3px solid white;
                box-shadow:0 2px 10px rgba(0,0,0,0.32);
                color:white;
                font-size:${size <= 32 ? 11 : 13}px;
                font-weight:700;
                font-family:inherit;
                letter-spacing:-0.3px;
            ">${count}</span>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -(size / 2 + 6)],
    });
}