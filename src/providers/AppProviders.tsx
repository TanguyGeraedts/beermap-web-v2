import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthProvider>
  );
};
