import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export const LoginPage = () => {
  const { isAuthenticated, loginWithGoogle } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="grid gap-4 text-center">
        <h1>BeerMap Login</h1>
        <p>Sign in with Google to continue.</p>
        <button type="button" onClick={loginWithGoogle}>
          Continue with Google
        </button>
      </div>
    </main>
  );
};
