import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ThemeProvider } from '../../features/theme/ThemeProvider';

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};
