import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useTheme } from '@/hooks/useTheme';
import { Button, Card, VersionPill } from '@/components/ui';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isAdmin } = useIsAdmin();
    const { isDark, toggle } = useTheme();

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

            {/* Admin Settings Section ... (remains unchanged) */}
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

            {/* Appearance Section ... (remains unchanged) */}
            <section className="space-y-2">
                <h2 className="text-xs font-bold uppercase text-(--color-muted) px-1">
                    Appearance
                </h2>
                <Card variant="default">
                    <Card.Body>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-(--color-text)">Dark Mode</p>
                                <p className="text-xs text-(--color-muted)">
                                    {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                                </p>
                            </div>
                            <button
                                onClick={toggle}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                                    isDark ? 'bg-(--color-primary)' : 'bg-(--color-border)'
                                }`}
                            >
                                <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ${
                                    isDark ? 'translate-x-6' : 'translate-x-1'
                                }`}>
                                    {isDark ? '🌙' : '☀️'}
                                </span>
                            </button>
                        </div>
                    </Card.Body>
                </Card>
            </section>

            {/* Application Section - Added Version Here */}
            <section className="space-y-2">
                <h2 className="text-xs font-bold uppercase text-(--color-muted) px-1">
                    Application
                </h2>
                <Card variant="default">
                    <Card.Body className="flex flex-col gap-2">
                        <Button variant="secondary" className="justify-start">Privacy</Button>
                        <Button variant="secondary" className="justify-start">Notifications</Button>

                        {/* New Version Row */}
                        <div className="flex items-center justify-between p-2 mt-2 border-t border-(--color-border) pt-4">
                            <span className="text-sm font-medium text-(--color-text)">Version Info</span>
                            <VersionPill />
                        </div>
                    </Card.Body>
                </Card>
            </section>

            <Button variant="danger" className="w-full" onClick={handleLogout}>
                Sign Out
            </Button>
        </div>
    );
};