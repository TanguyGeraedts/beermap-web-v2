import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider } from '../../features/auth/AuthProvider';
import { ThemeProvider } from '../../features/theme/ThemeProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};
