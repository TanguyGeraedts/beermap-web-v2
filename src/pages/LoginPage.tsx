import {Navigate} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';
import {Button} from "@/components/ui";

export const LoginPage = () => {
    const {isAuthenticated, loginWithGoogle} = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return (
        <main className="grid min-h-dvh place-items-center p-6">
            <div className="grid gap-4 text-center">
                <h1>BeerMap Login</h1>
                <p>Sign in with Google to continue.</p>
                <Button variant="primary" size="md" onClick={loginWithGoogle}> Continue with Google</Button>
            </div>
        </main>
    );
};