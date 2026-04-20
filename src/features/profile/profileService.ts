import { apiClient } from '../../shared/api/apiClient';
import type {
  CreateProfileRequest,
  CreateUploadUrlResponse,
  MeApiResponse,
  MeResponse,
  UpdateProfileRequest
} from '../../shared/types';

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

  uploadProfileImage: async (file: File) => {
    const { data } = await apiClient.post<CreateUploadUrlResponse>(
      '/images/presign/profile-picture',
      { contentType: file.type }
    );

    await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type
      },
      body: file
    });

    return data.publicUrl;
  }
};
