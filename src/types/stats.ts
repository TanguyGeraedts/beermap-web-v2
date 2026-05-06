export type DrinkCategory = 'BEER' | 'WINE' | 'COCKTAIL' | 'SPIRITS' | 'OTHER';

export type TotalsStatsResponse = {
  totalEntries: number;
  totalDrinks: number;
  activeDays: number;
};

export type CountByDayResponse = {
  day: string;
  drinks: number;
};

export type CountByWeekResponse = {
  isoYear: number;
  isoWeek: number;
  drinks: number;
};

export type TimeStatsResponse = {
  drinksPerDay: CountByDayResponse[];
  drinksPerWeek: CountByWeekResponse[];
  peakHour: number | null;
  streak: number;
};

export type CountByCategoryResponse = {
  category: DrinkCategory;
  drinks: number;
};

export type CategoryStatsResponse = {
  drinksByCategory: CountByCategoryResponse[];
  entriesByCategory: CountByCategoryResponse[];
};

export type FavoriteDrinkResponse = {
  name: string;
  category: DrinkCategory;
  drinks: number;
};

export type FavoriteCategoryResponse = {
  category: DrinkCategory;
  drinks: number;
};

export type FavoritesStatsResponse = {
  favoriteDrinkOverall: FavoriteDrinkResponse | null;
  favoriteDrinkThisMonth: FavoriteDrinkResponse | null;
  favoriteCategoryThisMonth: FavoriteCategoryResponse | null;
};

export type StatsOverviewResponse = {
  totals: TotalsStatsResponse;
  time: TimeStatsResponse;
  categories: CategoryStatsResponse;
  favorites: FavoritesStatsResponse;
};
