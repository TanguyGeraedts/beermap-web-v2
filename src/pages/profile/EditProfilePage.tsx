import { useNavigate } from 'react-router-dom';
import { useMe } from "@/hooks/useMe.ts";
import { EditProfile } from "@/components/profile/EditProfile.tsx";
import { Button } from '@/components/ui';
import { Pencil, ChevronLeft } from 'lucide-react';

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
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Pencil size={18} style={{ color: 'var(--color-primary)' }} />
                    <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Edit Profile</h1>
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="rounded-xl"
                >
                    <ChevronLeft size={14} strokeWidth={2.5} />
                    Profile
                </Button>
            </div>

            <div
                className="px-4 py-5 rounded-2xl border"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
                <EditProfile />
            </div>
        </div>
    );
};