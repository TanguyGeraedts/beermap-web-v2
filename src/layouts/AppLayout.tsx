import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/layout/BottomNav';
import { MapPage } from '@/pages/MapPage';
import { cn } from '@/utils/cn';

export const AppLayout = () => {
  const { pathname } = useLocation();
  const isMapPage = pathname === '/map';

  return (
    <div
      className={cn(
        'min-h-dvh text-[var(--color-text)]',
        isMapPage ? 'bg-transparent' : 'bg-[var(--color-app-bg)]'
      )}
    >
      <MapPage />
      <div
        className={cn(
          'relative w-full',
          isMapPage
            ? 'pointer-events-none min-h-dvh'
            : 'mx-auto min-h-dvh max-w-4xl px-4 pb-28 pt-[calc(env(safe-area-inset-top)+2rem)] sm:px-6'
        )}
      >
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};
