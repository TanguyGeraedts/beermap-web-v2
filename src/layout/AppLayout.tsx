import { Outlet } from 'react-router-dom';
import {BottomNavbar} from "@/components/layout/BottomNavbar.tsx";

export const AppLayout = () => {
    return (
        <div className="min-h-dvh flex flex-col bg-(--color-app-bg) text-(--color-text)">
            <main className="flex-1 w-full mx-auto max-w-4xl px-4 pt-8 pb-24">
                {/* pb-24 ensures content isn't hidden behind the fixed nav */}
                <Outlet />
            </main>

            <BottomNavbar />
        </div>
    );
};