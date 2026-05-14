import { apiClient } from './apiClient';
import {ChangelogResponse, MetaResponse} from "@/types/meta.ts";

export const metaService = {
    getVersion: async (): Promise<MetaResponse> => {
        const { data } = await apiClient.get<MetaResponse>('/meta');
        return data;
    },

    getChangelog: async (): Promise<ChangelogResponse> => {
        const { data } = await apiClient.get<ChangelogResponse>('/meta/changelog');
        return data;
    }
};