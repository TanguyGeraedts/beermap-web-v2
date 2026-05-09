import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import {ProfileProvider} from "@/providers/ProfileProvider.tsx";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
      <AuthProvider>
          <ProfileProvider>
              <BrowserRouter>{children}</BrowserRouter>
          </ProfileProvider>
      </AuthProvider>
  );
};
