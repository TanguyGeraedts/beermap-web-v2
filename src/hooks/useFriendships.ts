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

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['friendships'] });

    const sendRequest = useMutation({
        mutationFn: friendshipService.sendRequest,
        onSuccess: invalidate,
    });

    const acceptRequest = useMutation({
        mutationFn: friendshipService.acceptRequest,
        onSuccess: invalidate,
    });

    const rejectRequest = useMutation({
        mutationFn: friendshipService.rejectRequest,
        onSuccess: invalidate,
    });

    const cancelRequest = useMutation({
        mutationFn: friendshipService.cancelRequest,
        onSuccess: invalidate,
    });

    const removeFriend = useMutation({
        mutationFn: friendshipService.removeFriend,
        onSuccess: invalidate,
    });

    return {
        friends: friends.data ?? [],
        sent: sentRequests.data ?? [],
        received: receivedRequests.data ?? [],
        isLoading: friends.isLoading || receivedRequests.isLoading || sentRequests.isLoading,
        actions: {
            send: sendRequest.mutateAsync,
            accept: acceptRequest.mutateAsync,
            reject: rejectRequest.mutateAsync,  // For incoming
            cancel: cancelRequest.mutateAsync,  // For outgoing
            remove: removeFriend.mutateAsync,   // For accepted friends
        }
    };
};