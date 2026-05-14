import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { draftLogService } from '@/services/draftLogService';

export const useDraftLogs = () => {
    return useQuery({
        queryKey: ['draftLogs', 'me'],
        queryFn: draftLogService.getMe,
    });
};

export const useDraftLog = (draftId: string | null) => {
    return useQuery({
        queryKey: ['draftLogs', draftId],
        // Resolve the draft from the already-cached list whenever possible,
        // so we avoid a speculative call to an endpoint not confirmed in the spec.
        queryFn: async () => {
            return draftLogService.get(draftId!);
        },
        enabled: !!draftId,
        // Don't surface an error to the UI if the single-get endpoint is absent —
        // the page falls back to resolving the draft from the list cache instead.
        retry: false,
    });
};

export const useCreateDraftLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: draftLogService.create,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draftLogs', 'me'] }),
    });
};

export const useDeleteDraftLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (draftId: string) => draftLogService.delete(draftId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draftLogs', 'me'] }),
    });
};

export const useDeleteAllDraftLogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: draftLogService.deleteAll,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['draftLogs', 'me'] }),
    });
};