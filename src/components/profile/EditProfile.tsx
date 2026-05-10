import {useEffect, useRef, useState, type ChangeEvent} from 'react';
import {useMe} from '@/hooks/useMe';
import {useIsPremium} from '@/hooks/useIsPremium.ts';
import {Alert, Avatar, Button, Card, Input} from '@/components/ui';
import {DiscriminatorInput} from '@/components/ui/components/DescriminatorInput.tsx';
import {UserRankPill} from '@/components/ui/components/UserRankPill.tsx';
import {Trash2, Upload} from 'lucide-react';

export const EditProfile = () => {
    const {profile, updateProfile, uploadProfileImage} = useMe();
    const {isPremium} = useIsPremium();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const initialised = useRef(false);

    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        avatarUrl: null as string | null,
        discriminator: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (profile && !initialised.current) {
            initialised.current = true;
            setFormData({
                username: profile.username || '',
                bio: profile.bio || '',
                avatarUrl: profile.avatarUrl ?? null,
                discriminator: profile.discriminator || ''
            });
        }
    }, [profile]);

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setStatus(null);
        try {
            const publicUrl = await uploadProfileImage(file);
            setFormData((prev) => ({...prev, avatarUrl: publicUrl}));
        } catch {
            setStatus({type: 'error', msg: 'Failed to upload image. Please try again.'});
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({...prev, avatarUrl: null}));
    };

    const handleSubmit = async () => {
        setStatus(null);
        try {
            await updateProfile({
                ...formData,
                avatarUrl: formData.avatarUrl ?? null,
            });
            setStatus({type: 'success', msg: 'Profile updated successfully!'});
        } catch {
            setStatus({type: 'error', msg: 'Failed to update profile. Please try again.'});
        }
    };

    return (
        <Card variant="default" className="max-w-md mx-auto">
            <Card.Header>
                <h2 className="text-xl font-bold">Edit Profile</h2>
                <p className="text-sm text-(--color-muted)">Update your public information</p>
            </Card.Header>

            <Card.Body>
                <form onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }} className="space-y-6">
                    {/* Avatar Upload Section */}
                    <div className="flex flex-col items-center gap-3 py-2">
                        <Avatar
                            src={formData.avatarUrl ?? undefined}
                            fallback={formData.username}
                            size="xl"
                        />

                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="gap-1.5"
                                disabled={isUploading}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload size={14}/>
                                {isUploading ? 'Uploading...' : 'Upload photo'}
                            </Button>

                            {formData.avatarUrl && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1.5 text-(--color-muted) hover:text-red-500"
                                    onClick={handleRemoveImage}
                                >
                                    <Trash2 size={14}/>
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>

                    {status && (
                        <Alert variant={status.type === 'success' ? 'success' : 'error'}>
                            {status.msg}
                        </Alert>
                    )}

                    <div className="space-y-4">
                        <Input
                            label="Username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />

                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-(--color-text)">Discriminator</span>
                                {!isPremium && <UserRankPill accountType="PREMIUM"/>}
                            </div>

                            <DiscriminatorInput
                                value={formData.discriminator}
                                onChange={(val) => setFormData({...formData, discriminator: val})}
                                disabled={!isPremium}
                                helperText={
                                    isPremium
                                        ? '4-digit number shown on your profile'
                                        : 'Upgrade to Premium to customise your discriminator'
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-(--color-text)">
                                Bio
                            </label>
                            <textarea
                                className="bg-(--color-surface) text-(--color-text) border border-(--color-border) rounded p-3 min-h-25 focus:outline-none focus:ring-2 focus:ring-(--color-primary) disabled:opacity-50 transition-all"
                                placeholder="Tell us about yourself..."
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                    >
                        Save Changes
                    </Button>
                </form>
            </Card.Body>
        </Card>
    );
};