import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-app-bg)] text-[var(--color-text)]">
      <div className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-28 pt-6 sm:px-6">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
};
