import { useMe } from "@/hooks/useMe.ts";

export const useIsAdmin = () => {
    const { profile, isLoading } = useMe();
    const isAdmin = profile?.accountType === 'ADMIN';
    return { isAdmin, isLoading };
};