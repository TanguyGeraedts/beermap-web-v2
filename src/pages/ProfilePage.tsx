import {Navigate} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';
import {useMe} from "@/hooks/useMe.ts";
import ProfileHeader from "@/components/profile/ProfileHeader.tsx";
import {MeResponse} from "@/types";
import {Button} from "@/components/ui";

export const ProfilePage = () => {
    const {isAuthenticated, logout} = useAuth();
    const {profile, isLoading} = useMe();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    if (isLoading) {
        return <main className="grid min-h-dvh place-items-center p-6">Loading...</main>;
    }

    const isSetupRequired = profile && 'type' in profile && profile.type === 'ACCOUNT_SETUP_REQUIRED';

    return (
        <main className="grid min-h-dvh place-items-center p-6 text-center">
            <div className="grid gap-3">

                {isSetupRequired ? (
                    <div>
                        <p>Account setup required.</p>
                    </div>
                ) : (
                    <ProfileHeader profile={profile as MeResponse}/>
                )}

                <Button variant="danger" size="md"  onClick={logout}>Log out</Button>
            </div>
        </main>
    );
};