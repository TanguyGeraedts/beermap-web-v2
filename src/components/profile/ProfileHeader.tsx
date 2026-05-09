import React from 'react';
import { MeResponse } from '@/types/auth';

interface ProfileHeaderProps {
    profile: MeResponse | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
    if (!profile) return null;

    return (
        <div className="flex flex-col gap-2 p-4 border rounded-xl bg-card">
            <p className="text-xs font-mono text-muted-foreground">
                ID: {profile.id}
            </p>

            <h2 className="text-2xl font-bold tracking-tight">
                {`${profile.username}#${profile.discriminator}`}
            </h2>

            <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {profile.accountType}
                </span>
                <span className="text-xs text-muted-foreground">
                    Joined {new Date(profile.createdAt).toLocaleDateString()}
                </span>
            </div>

            {profile.bio && (
                <p className="mt-2 text-sm leading-relaxed text-balance">
                    {profile.bio}
                </p>
            )}
        </div>
    );
};

export default ProfileHeader;