import {useNavigate} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';
import {useIsAdmin} from '@/hooks/useIsAdmin';
import {Button, Card} from "@/components/ui";

export const SettingsPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isAdmin } = useIsAdmin();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col max-w-2xl mx-auto p-4 space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Settings</h1>
                <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </header>

            {isAdmin && (
                <section className="space-y-2">
                    <h2 className="text-xs font-bold uppercase text-(--color-muted) px-1">
                        Admin Settings
                    </h2>
                    <Card variant="default">
                        <Card.Body className="flex flex-col gap-2">
                            <Button
                                variant="primary"
                                className="w-full"
                                onClick={() => navigate('/ui-components')}
                            >
                                Open UI Components
                            </Button>
                        </Card.Body>
                    </Card>
                </section>
            )}

            {/* Application Section */}
            <section className="space-y-2">
                <h2 className="text-xs font-bold uppercase text-(--color-muted) px-1">
                    Application
                </h2>
                <Card variant="default">
                    <Card.Body className="flex flex-col gap-2">
                        <Button variant="secondary" className="justify-start">Privacy</Button>
                        <Button variant="secondary" className="justify-start">Notifications</Button>
                        <Button variant="secondary" className="justify-start">Appearance</Button>
                    </Card.Body>
                </Card>
            </section>

            {/* Logout */}
            <Button variant="danger" className="w-full" onClick={handleLogout}>
                Sign Out
            </Button>
        </div>
    );
};