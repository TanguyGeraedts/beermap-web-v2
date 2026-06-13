import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useMe } from "@/hooks/useMe.ts";
import ProfileHeader from "@/components/profile/ProfileHeader.tsx";
import { MeResponse } from "@/types";
import { Button } from '@/components/ui';
import { User, Settings } from 'lucide-react';

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
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <User size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Profile</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/settings')}
                    className="rounded-xl"
                >
                    <Settings size={14} strokeWidth={2.5} />
                    Settings
                </Button>
            </div>

            <div
                className="px-4 py-5 rounded-2xl space-y-5"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
                {isSetupRequired ? (
                    <div className="text-center py-4" style={{ color: 'var(--color-muted)' }}>
                        <p className="text-sm">Account setup required.</p>
                    </div>
                ) : (
                    <ProfileHeader profile={profile as MeResponse} />
                )}

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
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};