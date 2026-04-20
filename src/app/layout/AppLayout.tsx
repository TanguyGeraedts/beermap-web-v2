import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../shared/lib/cn';
import { BottomNav } from './BottomNav';

export const AppLayout = () => {
  const { pathname } = useLocation();
  const isMapPage = pathname === '/map';

  return (
    <div className="min-h-dvh bg-[var(--color-app-bg)] text-[var(--color-text)]">
      <div
        className={cn(
          'w-full',
          isMapPage
            ? 'min-h-dvh'
            : 'mx-auto min-h-dvh max-w-4xl px-4 pb-28 pt-[calc(env(safe-area-inset-top)+2rem)] sm:px-6'
        )}
      >
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};
