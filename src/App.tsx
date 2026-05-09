import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { AppProviders } from '@/providers/AppProviders';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
  const { isLoading, isAuthenticated, loginWithGoogle, logout, user } = useAuth();

  if (isLoading) {
    return <main className="grid min-h-dvh place-items-center p-6">Loading…</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="grid min-h-dvh place-items-center p-6">
        <button onClick={loginWithGoogle} type="button">
          Sign in with Google
        </button>
      </main>
    );
  }

  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div className="grid gap-3">
        <h1>Logged in</h1>
        <p>{user?.email ?? user?.username ?? user?.id}</p>
        <button onClick={logout} type="button">
          Log out
        </button>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <AppProviders>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProviders>
  );
};

export default App;
