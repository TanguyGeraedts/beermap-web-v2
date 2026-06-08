import { apiClient } from '@/services/apiClient';
import {DrinkLogResponse, DrinkLogTimeline, LogDrinkRequest, UpdateDrinkLogRequest} from "@/types";

export const drinkLogService = {
    logDrink: async (payload: LogDrinkRequest) => {
        const { data } = await apiClient.post<DrinkLogResponse>('/drink-logs/me', payload);
        return data;
    },

    getTimeline: async (page: number = 0, size: number = 20) => {
        const { data } = await apiClient.get<DrinkLogTimeline>('/drink-logs/me', {
            params: { page, size }
        });
        return data;
    },

    getDrinksFromDay: async (date: string) => {
        const { data } = await apiClient.get<DrinkLogResponse[]>(`/drink-logs/me/day/${date}`);
        return data;
    },

    getLog: async (logId: string) => {
        const { data } = await apiClient.get<DrinkLogResponse>(`/drink-logs/me/${logId}`);
        return data;
    },

    updateLog: async (logId: string, payload: UpdateDrinkLogRequest) => {
        const { data } = await apiClient.patch<DrinkLogResponse>(`/drink-logs/me/${logId}`, payload);
        return data;
    },

    deleteLog: async (logId: string) => {
        await apiClient.delete(`/drink-logs/me/${logId}`);
    },

    logFromDraft: async (draftId: string, payload: LogDrinkRequest) => {
        const { data } = await apiClient.post<DrinkLogResponse>(
            `/drink-logs/me/from-draft/${draftId}`,
            payload
        );
        return data;
    },
};