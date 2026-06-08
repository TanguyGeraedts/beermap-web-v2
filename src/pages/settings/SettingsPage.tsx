import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useTheme } from '@/hooks/useTheme';
import { VersionPill, LegalPill } from "@/components/ui";

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
                    {/* Minimalist Gear SVG */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                        Settings
                    </h1>
                </div>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors active:scale-[0.98]"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {/* Minimalist Left Chevron SVG */}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back
                </button>
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
                    {/* Info and Pills Row */}
                    <div className="flex items-center justify-between px-3 py-1.5 flex-row">
                        <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>About & Legal</span>
                        <div className="flex items-center gap-1.5">
                            <LegalPill />
                            <VersionPill />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sign Out Action Button */}
            <button
                type="button"
                onClick={handleLogout}
                className="w-full text-center text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.99] cursor-pointer"
                style={{
                    background: 'var(--color-surface-muted)',
                    color: '#ef4444',
                    border: '1px solid var(--color-border)'
                }}
            >
                Sign Out
            </button>
        </div>
    );
};