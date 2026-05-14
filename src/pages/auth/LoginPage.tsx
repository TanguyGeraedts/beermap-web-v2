import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {Button, Card, LegalPill, VersionPill} from '@/components/ui';

export const LoginPage = () => {
    const { isAuthenticated, loginWithGoogle } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="grid min-h-dvh place-items-center p-6 bg-(--color-bg)">
            <div className="w-full max-w-sm flex flex-col items-center gap-8">
                <Card variant="elevated" className="w-full">
                    <Card.Body className="flex flex-col gap-6 text-center py-10">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-black tracking-tight text-(--color-text)">
                                BeerMap
                            </h1>
                            <p className="text-sm text-(--color-muted)">
                                Sign in to discover and log your favorite brews.
                            </p>
                        </div>

                        <Button
                            variant="primary"
                            size="lg"
                            className="w-full flex items-center justify-center gap-3 shadow-md"
                            onClick={loginWithGoogle}
                        >
                            <GoogleIcon />
                            <span>Continue with Google</span>
                        </Button>
                    </Card.Body>

                    <Card.Footer className="text-center py-4 opacity-70">
                        <p className="text-[10px] uppercase tracking-widest font-bold">
                            Secure Login
                        </p>
                    </Card.Footer>
                </Card>

                {/* Footer Pills */}
                <div className="flex items-center gap-2">
                    <VersionPill />
                    <span className="text-slate-300 select-none">•</span>
                    <LegalPill />
                </div>
            </div>
        </main>
    );
};


const GoogleIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);