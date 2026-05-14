import { DrinkCategory } from '@/types';

export const BEER_SUBTYPES = ['Lager', 'Pilsner', 'IPA', 'Pale Ale', 'Stout', 'Porter', 'Wheat', 'Sour', 'Belgian'];
export const COCKTAIL_SUBTYPES = ['Classic', 'Sour', 'Highball', 'Martini', 'Negroni', 'Spritz', 'Tiki'];
export const WINE_SUBTYPES = ['Red', 'White', 'Rosé', 'Sparkling', 'Dessert', 'Fortified'];
export const SPIRIT_SUBTYPES = ['Whisky', 'Gin', 'Rum', 'Vodka', 'Tequila', 'Mezcal', 'Brandy'];

export type VolumePreset = { label: string; ml: number };

export const VOLUME_PRESETS: Record<DrinkCategory, VolumePreset[]> = {
    BEER: [
        { label: '250ml', ml: 250 },
        { label: '330ml', ml: 330 },
        { label: '500ml', ml: 500 },
        { label: '750ml', ml: 750 },
    ],
    WINE: [
        { label: 'Glass (150ml)', ml: 150 },
        { label: 'Lg Glass (250ml)', ml: 250 },
        { label: 'Bottle (750ml)', ml: 750 },
    ],
    COCKTAIL: [
        { label: '60ml', ml: 60 },
        { label: '90ml', ml: 90 },
        { label: '120ml', ml: 120 },
        { label: '180ml', ml: 180 },
        { label: '300ml', ml: 300 },
    ],
    SPIRITS: [
        { label: 'Single (25ml)', ml: 25 },
        { label: 'Double (50ml)', ml: 50 },
        { label: 'Triple (75ml)', ml: 75 },
        { label: ' Large (100ml)', ml: 100 },
    ],
    OTHER: [
        { label: '100ml', ml: 100 },
        { label: '200ml', ml: 200 },
        { label: '330ml', ml: 330 },
        { label: '500ml', ml: 500 },
        { label: '750ml', ml: 750 },
    ],
};

export const DEFAULT_VOLUMES: Record<DrinkCategory, number> = {
    BEER: 330, WINE: 150, COCKTAIL: 120, SPIRITS: 50, OTHER: 330,
};

export function getSubtypeSuggestions(category: DrinkCategory): string[] {
    switch (category) {
        case 'BEER': return BEER_SUBTYPES;
        case 'COCKTAIL': return COCKTAIL_SUBTYPES;
        case 'WINE': return WINE_SUBTYPES;
        case 'SPIRITS': return SPIRIT_SUBTYPES;
        default: return [];
    }
}