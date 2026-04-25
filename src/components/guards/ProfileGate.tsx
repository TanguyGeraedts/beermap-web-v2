import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProfileContext } from '@/contexts/profileContext';
import { useMeController } from '@/hooks/useMeController';

type ProfileGateProps = {
  children: ReactNode;
};

export const ProfileGate = ({ children }: ProfileGateProps) => {
  const location = useLocation();
  const profileState = useMeController();
  const { refetch } = profileState;
  const isSetupRoute = location.pathname === '/profile/setup';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refetch();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refetch]);

  if (profileState.isLoading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-[var(--color-app-bg)] px-6 text-center text-[var(--color-text)]">
        <p className="text-sm font-semibold text-[var(--color-muted)]">
          Checking your BeerMap profile
        </p>
      </div>
    );
  }

  if (profileState.needsSetup && !isSetupRoute) {
    return <Navigate to="/profile/setup" replace state={{ from: location }} />;
  }

  if (profileState.profile && isSetupRoute) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <ProfileContext.Provider value={profileState}>
      {children}
    </ProfileContext.Provider>
  );
};
