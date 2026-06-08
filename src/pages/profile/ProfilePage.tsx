import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMe } from "@/hooks/useMe.ts";
import ProfileHeader from "@/components/profile/ProfileHeader.tsx";
import { MeResponse } from "@/types";

export const ProfilePage = () => {
    const { isAuthenticated } = useAuth();
    const { profile, isLoading } = useMe();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="rounded-xl h-12 animate-pulse" style={{ background: 'var(--color-surface)' }} />
                <div className="rounded-2xl h-48 animate-pulse" style={{ background: 'var(--color-surface)' }} />
            </div>
        );
    }

    const isSetupRequired = profile && 'type' in profile && profile.type === 'ACCOUNT_SETUP_REQUIRED';

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {/* Minimalist User SVG instead of Lucide icon */}
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
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                        Profile
                    </h1>
                </div>

                <button
                    onClick={() => navigate('/settings')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors active:scale-[0.98]"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {/* Minimalist Gear SVG */}
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
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    Settings
                </button>
            </div>

            {/* Main Content Card */}
            <div
                className="px-4 py-5 rounded-2xl space-y-5"
                style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                }}
            >
                {isSetupRequired ? (
                    <div className="text-center py-4" style={{ color: 'var(--color-muted)' }}>
                        <p className="text-sm">Account setup required.</p>
                    </div>
                ) : (
                    <ProfileHeader profile={profile as MeResponse} />
                )}

                {/* Navigation Links Group */}
                <div className="grid gap-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    {[
                        { label: 'Stats', path: '/profile/stats' },
                        { label: 'Edit Profile', path: '/profile/edit' },
                        { label: 'Friends', path: '/profile/friends' }
                    ].map((item) => (
                        <button
                            key={item.path}
                            type="button"
                            onClick={() => navigate(item.path)}
                            className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition-colors hover:bg-[var(--color-ring-soft)] active:scale-[0.99]"
                            style={{ color: 'var(--color-text)' }}
                        >
                            <span className="text-sm font-medium">{item.label}</span>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--color-muted)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};