import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { drinkCatalogService } from '@/services/drinkCatalogService';
import {CreateDrinkCatalogItemRequest, DrinkCategory, UpdateDrinkCatalogItemRequest} from "@/types";


export const useCreateDrinkCatalogItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: CreateDrinkCatalogItemRequest) => drinkCatalogService.create(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drinkCatalog'] });
        },
    });
};


export const useDrinkCatalogItem = (id: string | null) => {
    return useQuery({
        queryKey: ['drinkCatalog', id],
        queryFn: () => drinkCatalogService.getById(id!),
        enabled: !!id,
    });
};


export const useDrinkCatalogItems = () => {
    return useQuery({
        queryKey: ['drinkCatalog', 'all'],
        queryFn: () => drinkCatalogService.getAll(),
    });
};


export const useDrinkCatalogSearchByName = (name: string | null) => {
    return useQuery({
        queryKey: ['drinkCatalog', 'search-name', name],
        queryFn: () => drinkCatalogService.searchByName(name!),
        enabled: !!name,
    });
};


export const useDrinkCatalogByCategory = (category: DrinkCategory | null) => {
    return useQuery({
        queryKey: ['drinkCatalog', 'category', category],
        queryFn: () => drinkCatalogService.getByCategory(category!),
        enabled: !!category,
    });
};


export const useDrinkCatalogSearch = (category: DrinkCategory | null, query?: string) => {
    return useQuery({
        queryKey: ['drinkCatalog', 'search', category, query],
        queryFn: () => drinkCatalogService.searchByCategoryAndName(category!, query),
        enabled: !!category,
    });
};


export const useDrinkCatalogSearchBySubType = (subType?: string) => {
    return useQuery({
        queryKey: ['drinkCatalog', 'search-sub-type', subType],
        queryFn: () => drinkCatalogService.searchBySubType(subType),
        enabled: !!subType,
    });
};


export const useUpdateDrinkCatalogItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: UpdateDrinkCatalogItemRequest }) =>
            drinkCatalogService.update(id, request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['drinkCatalog'] });
            queryClient.setQueryData(['drinkCatalog', data.id], data);
        },
    });
};

export const useDeleteDrinkCatalogItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => drinkCatalogService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drinkCatalog'] });
        },
    });
};