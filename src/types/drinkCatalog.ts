import {DrinkCategory} from "@/types/drinkCategory.ts";

export interface CreateDrinkCatalogItemRequest {
    name: string;
    category: DrinkCategory;
    subType?: string;
    abvPercent?: number;
}

export interface UpdateDrinkCatalogItemRequest {
    name?: string;
    category?: DrinkCategory;
    subType?: string;
    abvPercent?: number;
}

export interface DrinkCatalogItemResponse {
    id: string;
    name: string;
    category: DrinkCategory;
    subType?: string;
    abvPercent?: number;
    createdAt: string;
    updatedAt: string;
}