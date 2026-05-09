import React from 'react';
import { MeResponse } from '@/types/auth';
import { Avatar, Card } from "@/components/ui";
import { UserRankPill } from "@/components/ui/components/UserRankPill";

interface ProfileHeaderProps {
    profile: MeResponse | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
    if (!profile) return null;

    return (
        <div className="grid grid-cols-1 gap-4">
            <Card variant="default">
                <Card.Header>
                    <div className="flex items-center gap-4">
                        <Avatar
                            src={profile.avatarUrl ?? ""}
                            alt={`${profile.username}'s avatar`}
                            size="lg"
                        />

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-(--color-text)">
                                    {profile.username}#{profile.discriminator}
                                </h3>
                                <UserRankPill accountType={profile.accountType} />
                            </div>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body className="space-y-4">
                    {profile.bio && (
                        <p className="text-sm leading-relaxed text-(--color-text)">
                            {profile.bio}
                        </p>
                    )}

                    <div className="pt-2 border-t border-(--color-border)">
                        <p className="text-xs text-(--color-muted)">
                            Member since {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfileHeader;