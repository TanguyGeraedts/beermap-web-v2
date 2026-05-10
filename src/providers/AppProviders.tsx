import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/providers/AuthProvider';
import { ProfileProvider } from "@/providers/ProfileProvider.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

type AppProvidersProps = {
    children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ProfileProvider>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </ProfileProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};