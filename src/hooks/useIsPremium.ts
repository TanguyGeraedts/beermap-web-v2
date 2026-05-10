import { useMe } from "@/hooks/useMe.ts";

export const useIsPremium = () => {
    const { profile, isLoading } = useMe();
    const isPremium = profile?.accountType === 'ADMIN' || profile?.accountType === 'PREMIUM';
    return { isPremium, isLoading };
};