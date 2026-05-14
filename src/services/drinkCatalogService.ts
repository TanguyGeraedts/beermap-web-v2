import { apiClient } from '@/services/apiClient';
import {
    CreateDrinkCatalogItemRequest,
    DrinkCatalogItemResponse,
    DrinkCategory,
    UpdateDrinkCatalogItemRequest
} from "@/types";

export const drinkCatalogService = {
    create: async (payload: CreateDrinkCatalogItemRequest) => {
        const { data } = await apiClient.post<DrinkCatalogItemResponse>('/catalog/drinks', payload);
        return data;
    },

    getById: async (id: string) => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse>(`/catalog/drinks/${id}`);
        return data;
    },

    getAll: async () => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse[]>('/catalog/drinks');
        return data;
    },

    getByName: async (name: string) => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse>('/catalog/drinks/by-name', {
            params: { name }
        });
        return data;
    },

    getByCategory: async (category: DrinkCategory) => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse[]>('/catalog/drinks/by-category', {
            params: { category }
        });
        return data;
    },

    searchByName: async (query?: string) => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse[]>('/catalog/drinks/search/name', {
            params: { query }
        });
        return data;
    },

    searchBySubType: async (subType?: string) => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse[]>('/catalog/drinks/search/sub-type', {
            params: { subType }
        });
        return data;
    },

    searchByCategoryAndName: async (category: DrinkCategory, query?: string) => {
        const { data } = await apiClient.get<DrinkCatalogItemResponse[]>('/catalog/drinks/search/category-name', {
            params: { category, query }
        });
        return data;
    },

    update: async (id: string, payload: UpdateDrinkCatalogItemRequest) => {
        const { data } = await apiClient.put<DrinkCatalogItemResponse>(`/catalog/drinks/${id}`, payload);
        return data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`/catalog/drinks/${id}`);
    },
};