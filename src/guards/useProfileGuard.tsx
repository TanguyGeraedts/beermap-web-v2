import { Navigate, useLocation } from 'react-router-dom';
import { useMe } from '@/hooks/useMe';

export const useProfileGuard = () => {
    const {  needsSetup, isLoading } = useMe();
    const location = useLocation();

    if (isLoading) {
        return {
            isAllowed: false,
            isLoading: true,
            loadingComponent: (
                <main className="grid min-h-dvh place-items-center p-6 text-(--color-muted)">
                    Loading...
                </main>
            ),
            redirectComponent: null
        };
    }

    if (needsSetup) {
        return {
            isAllowed: false,
            isLoading: false,
            loadingComponent: null,
            redirectComponent: <Navigate to="/profile/create" state={{ from: location }} replace />
        };
    }

    return {
        isAllowed: true,
        isLoading: false,
        loadingComponent: null,
        redirectComponent: null
    };
};