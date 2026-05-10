import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {isAxiosError} from 'axios';
import {profileService} from '@/services/profileService';
import type {CreateProfileRequest, UpdateProfileRequest, MeResponse} from '@/types';

const isSetupRequired = (value: unknown): value is { type: 'ACCOUNT_SETUP_REQUIRED' } => {
    return typeof value === 'object' && value !== null && 'type' in value && value.type === 'ACCOUNT_SETUP_REQUIRED';
};

export const useMeController = () => {
    const queryClient = useQueryClient();

    const {
        data,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                return await profileService.getMe();
            } catch (err) {
                if (isAxiosError(err) && err.response?.status === 404) {
                    return {type: 'ACCOUNT_SETUP_REQUIRED'} as any;
                }
                throw err;
            }
        }
    });

    const needsSetup = isSetupRequired(data);
    const profile = needsSetup ? null : (data as MeResponse);

    const createMutation = useMutation({
        mutationFn: (payload: CreateProfileRequest) => profileService.createMe(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['me']}),
    });

    const updateMutation = useMutation({
        mutationFn: (payload: UpdateProfileRequest) => profileService.updateMe(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['me']}),
    });

    const uploadImageMutation = useMutation({
        mutationFn: (file: File) => profileService.uploadProfileImage(file),
    });

    return {
        profile,
        needsSetup,
        isLoading,
        error: error instanceof Error ? error.message : null,
        refetch,
        createProfile: createMutation.mutateAsync,
        updateProfile: updateMutation.mutateAsync,
        uploadProfileImage: uploadImageMutation.mutateAsync
    };
};