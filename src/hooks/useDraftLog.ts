import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { draftLogService } from '@/services/draftLogService';

export const useDraftLogs = () => {
    return useQuery({
        queryKey: ['draftLogs', 'me'],
        queryFn: draftLogService.getMe
    });
};

export const useCreateDraftLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: draftLogService.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draftLogs', 'me'] })
    });
};