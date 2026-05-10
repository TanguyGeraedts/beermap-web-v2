import { Outlet } from 'react-router-dom';
import { useAuthGuard } from '@/guards/useAuthGuard';
import { useProfileGuard } from '@/guards/useProfileGuard';
import { BottomNavbar } from "@/components/layout/BottomNavbar.tsx";

export const AppLayout = () => {
    const auth = useAuthGuard();
    const profile = useProfileGuard();

    if (auth.isLoading || profile.isLoading) return auth.loadingComponent ?? profile.loadingComponent;
    if (!auth.isAllowed) return auth.redirectComponent;
    if (!profile.isAllowed) return profile.redirectComponent;

    return (
        <div className="min-h-dvh flex flex-col bg-(--color-app-bg) text-(--color-text)">
            <main className="flex-1 w-full mx-auto max-w-4xl px-4 pt-8 pb-24">
                <Outlet />
            </main>
            <BottomNavbar />
        </div>
    );
};