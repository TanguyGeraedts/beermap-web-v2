import {apiClient} from '@/services/apiClient';
import type {AcceptFriendRequest, Friendship, SendFriendRequest} from '@/types/friendship';

export const friendshipService = {
    getFriends: async () => {
        const { data } = await apiClient.get<Friendship[]>('/friendships/friends');
        return data;
    },

    getSentRequests: async () => {
        const { data } = await apiClient.get<Friendship[]>('/friendships/requests/sent');
        return data;
    },

    getReceivedRequests: async () => {
        const { data } = await apiClient.get<Friendship[]>('/friendships/requests/received');
        return data;
    },

    sendRequest: async (payload: SendFriendRequest) => {
        const { data } = await apiClient.post('/friendships/request', payload);
        return data;
    },

    acceptRequest: async (payload: AcceptFriendRequest) => {
        const { data } = await apiClient.post('/friendships/accept', payload);
        return data;
    },

    rejectRequest: async (friendshipId: string) => {
        const { data } = await apiClient.post(`/friendships/${friendshipId}/reject`);
        return data;
    },

    cancelRequest: async (friendshipId: string) => {
        const { data } = await apiClient.post(`/friendships/${friendshipId}/cancel`);
        return data;
    },

    removeFriend: async (friendshipId: string) => {
        const { data } = await apiClient.post(`/friendships/${friendshipId}/remove`);
        return data;
    }
};