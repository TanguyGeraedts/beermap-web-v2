import { useEffect, useRef, type ReactNode } from 'react';
import { ProfileContext } from '@/contexts/profileContext';
import { useMeController } from '@/hooks/useMeController';
import { useAuth } from '@/hooks/useAuth';

type ProfileProviderProps = {
    children: ReactNode;
};

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const controller = useMeController();
    const { isAuthenticated } = useAuth();
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (isAuthenticated && !hasInitialized.current) {
            hasInitialized.current = true;
            controller.refetch();
        }
    }, [isAuthenticated]);

    return (
        <ProfileContext.Provider value={controller}>
            {children}
        </ProfileContext.Provider>
    );
};