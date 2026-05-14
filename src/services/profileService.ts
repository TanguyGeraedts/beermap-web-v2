import { apiClient } from '@/services/apiClient';
import { imageService } from './imageService';
import type {
  CreateProfileRequest,
  MeApiResponse,
  MeResponse,
  UpdateProfileRequest
} from '@/types';

export const profileService = {
  getMe: async () => {
    const { data } = await apiClient.get<MeApiResponse>('/users/me');
    return data;
  },

  createMe: async (payload: CreateProfileRequest) => {
    const { data } = await apiClient.post<MeResponse>('/users/me', payload);
    return data;
  },

  updateMe: async (payload: UpdateProfileRequest) => {
    const { data } = await apiClient.patch<MeResponse>('/users/me', payload);
    return data;
  },

  uploadProfileImage: (file: File) => imageService.uploadProfileImage(file)
};