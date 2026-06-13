import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useTheme } from '@/hooks/useTheme';
import { VersionPill, LegalPill, Button } from "@/components/ui";
import { Settings, ChevronLeft } from 'lucide-react';

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
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Settings size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Settings</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(-1)}
                    className="rounded-xl"
                >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    Back
                </Button>
            </div>

            {/* Admin Settings Section */}
            {isAdmin && (
                <div className="space-y-1.5">
                    <h2 className="text-[10px] font-bold uppercase tracking-wider px-1" style={{ color: 'var(--color-muted)' }}>
                        Admin Settings
                    </h2>
                    <div
                        className="p-3 rounded-2xl border flex flex-col gap-1"
                        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    >
                        <button
                            onClick={() => navigate('/ui-components')}
                            className="w-full text-left text-sm font-medium px-3 py-2.5 rounded-xl transition-colors hover:bg-[var(--color-ring-soft)]"
                            style={{ color: 'var(--color-text)' }}
                        >
                            Open UI Components
                        </button>
                    </div>
                </div>
            )}

            {/* Appearance Section */}
            <div className="space-y-1.5">
                <h2 className="text-[10px] font-bold uppercase tracking-wider px-1" style={{ color: 'var(--color-muted)' }}>
                    Appearance
                </h2>
                <div
                    className="p-4 rounded-2xl border flex items-center justify-between"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                    <div>
                        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--color-text)' }}>Dark Mode</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                            {isDark ? 'Dark theme enabled' : 'Light theme enabled'}
                        </p>
                    </div>
                    <button
                        onClick={toggle}
                        type="button"
                        className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none cursor-pointer"
                        style={{
                            background: isDark ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ${
                            isDark ? 'translate-x-5' : 'translate-x-0.5'
                        }`}>
                            {isDark ? '🌙' : '☀️'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Application Section */}
            <div className="space-y-1.5">
                <h2 className="text-[10px] font-bold uppercase tracking-wider px-1" style={{ color: 'var(--color-muted)' }}>
                    Application
                </h2>
                <div
                    className="p-3 rounded-2xl border flex flex-col gap-1"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                    <div className="flex items-center justify-between px-3 py-1.5 flex-row">
                        <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>About & Legal</span>
                        <div className="flex items-center gap-1.5">
                            <LegalPill />
                            <VersionPill />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sign Out */}
            <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
                className="w-full rounded-2xl py-3 text-sm font-semibold"
                style={{ color: '#ef4444' }}
            >
                Sign Out
            </Button>
        </div>
    );
};