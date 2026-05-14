import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { drinkLogService } from '@/services/drinkLogService';
import {LogDrinkRequest, UpdateDrinkLogRequest} from "@/types";


export const useLogDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: LogDrinkRequest) => drinkLogService.logDrink(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drinkLogs', 'timeline'] });
        },
    });
};


export const useDrinkLogTimeline = () => {
    return useInfiniteQuery({
        queryKey: ['drinkLogs', 'timeline'],
        queryFn: ({ pageParam = 0 }) => drinkLogService.getTimeline(pageParam, 20),
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.currentPage < lastPage.totalPages - 1) {
                return lastPageParam + 1;
            }
            return undefined;
        },
        initialPageParam: 0,
    });
};


export const useDrinkLog = (logId: string | null) => {
    return useQuery({
        queryKey: ['drinkLogs', logId],
        queryFn: () => drinkLogService.getLog(logId!),
        enabled: !!logId,
    });
};


export const useUpdateDrinkLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ logId, request }: { logId: string; request: UpdateDrinkLogRequest }) =>
            drinkLogService.updateLog(logId, request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['drinkLogs', 'timeline'] });
            queryClient.setQueryData(['drinkLogs', data.id], data);
        },
    });
};


export const useDeleteDrinkLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (logId: string) => drinkLogService.deleteLog(logId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drinkLogs', 'timeline'] });
        },
    });
};


export const useLogDrinkFromDraft = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ draftId, request }: { draftId: string; request: LogDrinkRequest }) =>
            drinkLogService.logFromDraft(draftId, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drinkLogs', 'timeline'] });
        },
    });
};