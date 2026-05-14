import { apiClient } from './apiClient';
import { CreateDraftLogRequest, DraftLogResponse } from '@/types';

export const draftLogService = {
    getMe: async () => {
        const { data } = await apiClient.get<DraftLogResponse[]>('/draft-logs/me');
        return data;
    },

    get: async (draftId: string) => {
        const { data } = await apiClient.get<DraftLogResponse>(`/draft-logs/me/${draftId}`);
        return data;
    },
    create: async (payload: CreateDraftLogRequest) => {
        const { data } = await apiClient.post<DraftLogResponse>('/draft-logs/me', payload);
        return data;
    },
    delete: async (draftId: string) => {
        await apiClient.delete(`/draft-logs/me/${draftId}`);
    },
    deleteBatch: async (ids: string[]) => {
        await apiClient.delete('/draft-logs/me/batch', { data: ids });
    },
    deleteAll: async () => {
        await apiClient.delete('/draft-logs/me/all');
    },
};