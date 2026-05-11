import {DrinkCategory} from "./drinkCategory.ts";

export interface CategoryStat {
    category: DrinkCategory;
    drinks: number;
}

export interface FavoriteDrink {
    name: string;
    category: DrinkCategory;
    drinks: number;
}

export interface DrinkDay {
    day: string;
    drinks: number;
}

export interface DrinkWeek {
    isoYear: number;
    isoWeek: number;
    drinks: number;
}

export interface MeStatsResponse {
    totals: {
        totalEntries: number;
        totalDrinks: number;
        activeDays: number;
    };
    time: {
        drinksPerDay: DrinkDay[];
        drinksPerWeek: DrinkWeek[];
        peakHour: number;
        streak: number;
    };
    categories: {
        drinksByCategory: CategoryStat[];
        entriesByCategory: CategoryStat[];
    };
    favorites: {
        favoriteDrinkOverall: FavoriteDrink | null;
        favoriteDrinkThisMonth: FavoriteDrink | null;
        favoriteCategoryThisMonth: CategoryStat | null;
    };
}