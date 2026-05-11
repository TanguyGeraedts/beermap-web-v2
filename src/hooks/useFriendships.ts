import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { friendshipService } from '@/services/friendshipService';

export const useFriendships = () => {
    const queryClient = useQueryClient();

    const friends = useQuery({
        queryKey: ['friendships', 'list'],
        queryFn: friendshipService.getFriends,
    });

    const sentRequests = useQuery({
        queryKey: ['friendships', 'sent'],
        queryFn: friendshipService.getSentRequests,
    });

    const receivedRequests = useQuery({
        queryKey: ['friendships', 'received'],
        queryFn: friendshipService.getReceivedRequests,
    });

    // Mutations
    const sendRequest = useMutation({
        mutationFn: friendshipService.sendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['friendships', 'sent'] }),
    });

    const acceptRequest = useMutation({
        mutationFn: friendshipService.acceptRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendships'] });
        },
    });

    const removeFriend = useMutation({
        mutationFn: friendshipService.removeFriend,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['friendships', 'list'] }),
    });

    return {
        // Data
        friends: friends.data ?? [],
        sent: sentRequests.data ?? [],
        received: receivedRequests.data ?? [],
        // States
        isLoading: friends.isLoading || receivedRequests.isLoading || sentRequests.isLoading,
        // Actions
        actions: {
            send: sendRequest.mutateAsync,
            accept: acceptRequest.mutateAsync,
            remove: removeFriend.mutateAsync,
        }
    };
};