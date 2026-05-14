import { apiClient } from './apiClient';
import { CreateDraftLogRequest, DraftLogResponse } from '@/types';

export const draftLogService = {
    getMe: async () => {
        const { data } = await apiClient.get<DraftLogResponse[]>('/draft-logs/me');
        return data;
    },
    create: async (payload: CreateDraftLogRequest) => {
        const { data } = await apiClient.post<DraftLogResponse>('/draft-logs/me', payload);
        return data;
    },
    deleteBatch: async (ids: string[]) => {
        await apiClient.delete('/draft-logs/me/batch', { data: ids });
    }
};
