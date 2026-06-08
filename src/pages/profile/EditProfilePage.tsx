import { useNavigate } from 'react-router-dom';
import { useMe } from "@/hooks/useMe.ts";
import { EditProfile } from "@/components/profile/EditProfile.tsx";

export const EditProfilePage = () => {
    const { isLoading } = useMe();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="rounded-xl h-12 animate-pulse" style={{ background: 'var(--color-surface)' }} />
                <div className="rounded-2xl h-48 animate-pulse" style={{ background: 'var(--color-surface)' }} />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
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
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
                        Edit Profile
                    </h1>
                </div>

                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors active:scale-[0.98]"
                    style={{
                        background: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-muted)',
                    }}
                >
                    {/* Minimalist Arrow Left SVG */}
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
                    Profile
                </button>
            </div>

            <div
                className="px-4 py-5 rounded-2xl border"
                style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)'
                }}
            >
                <EditProfile />
            </div>
        </div>
    );
};