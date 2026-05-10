import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const useAuthGuard = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return {
            isAllowed: false,
            isLoading: true,
            loadingComponent: (
                <main className="grid min-h-dvh place-items-center p-6 text-(--color-muted)">
                    Loading...
                </main>
            )
        };
    }

    if (!isAuthenticated) {
        return {
            isAllowed: false,
            isLoading: false,
            redirectComponent: <Navigate to="/login" state={{ from: location }} replace />
        };
    }

    return {
        isAllowed: true,
        isLoading: false
    };
};