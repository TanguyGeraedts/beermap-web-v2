import {Navigate} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';
import {useMe} from "@/hooks/useMe.ts";
import ProfileHeader from "@/components/profile/ProfileHeader.tsx";
import {MeResponse} from "@/types";
import {Alert, Badge, Button, Card, Input, Skeleton} from "@/components/ui";

export const HomeScreen = () => {
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

                <Button variant="primary" size="md">Submit</Button>
                <Button variant="secondary" size="md">Submit</Button>
                <Button variant="ghost" size="md">Submit</Button>
                <Button variant="danger" size="md">Submit</Button>

                <Card variant="default">
                    <Card.Header>Profile</Card.Header>
                    <Card.Body>
                        <Input label="Name" error="Required" />
                        <Badge variant="primary">Active</Badge>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary">Save</Button>
                    </Card.Footer>
                </Card>

                <Alert variant="success" title="Success">
                    Profile updated!
                </Alert>

                <Skeleton height="h-12" rounded="md" />

                <button onClick={logout} type="button">
                    Log out
                </button>
            </div>
        </main>
    );
};