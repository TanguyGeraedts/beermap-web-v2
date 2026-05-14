import { apiClient } from '@/services/apiClient';
import type { CreateUploadUrlResponse } from '@/types';

export const imageService = {
    async uploadToStorage(file: File, presignData: CreateUploadUrlResponse): Promise<string> {
        const response = await fetch(presignData.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file
        });

        if (!response.ok) throw new Error('Failed to upload image to storage');
        return presignData.publicUrl;
    },

    async uploadProfileImage(file: File): Promise<string> {
        const { data } = await apiClient.post<CreateUploadUrlResponse>(
            '/images/presign/profile-picture',
            { contentType: file.type }
        );
        return this.uploadToStorage(file, data);
    },

    async uploadDrinkLogImage(file: File): Promise<string> {
        const { data } = await apiClient.post<CreateUploadUrlResponse>(
            '/images/presign/drink-log',
            {
                contentType: file.type
            }
        );
        return this.uploadToStorage(file, data); //
    }
};