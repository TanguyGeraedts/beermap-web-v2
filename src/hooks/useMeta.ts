import { useQuery } from '@tanstack/react-query';
import { metaService } from '@/services/metaService';

export const useAppVersion = () => {
    return useQuery({
        queryKey: ['meta', 'version'],
        queryFn: metaService.getVersion,
        staleTime: Infinity,
    });
};

export const useChangelog = () => {
    return useQuery({
        queryKey: ['meta', 'changelog'],
        queryFn: metaService.getChangelog,
    });
};