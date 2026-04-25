import { Navigate, useLocation } from 'react-router-dom';
import { GoogleLoginButton } from '@/components/ui/GoogleLoginButton';
import { Card, PageHeader } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname || '/journal';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-[var(--color-app-bg)] px-4 py-[calc(env(safe-area-inset-top)+2rem)] text-[var(--color-text)]">
      <div className="w-full max-w-md">
        <PageHeader
          eyebrow="BeerMap"
          title="Welcome back."
          description="Sign in once and BeerMap will remember you on this device."
        />
        <Card className="mt-8">
          <GoogleLoginButton />
        </Card>
      </div>
    </main>
  );
};
