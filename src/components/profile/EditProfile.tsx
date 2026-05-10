import {useState, useEffect} from 'react';
import {useMe} from '@/hooks/useMe';
import {
    Button,
    Card,
    Input,
    Avatar,
    Alert
} from '@/components/ui';

export const EditProfile = () => {
    const {profile, updateProfile,} = useMe();

    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        avatarUrl: ''
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    // Sync form with profile data when it loads
    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || '',
                bio: profile.bio || '',
                avatarUrl: profile.avatarUrl || ''
            });
        }
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        try {
            await updateProfile(formData);
            setStatus({type: 'success', msg: 'Profile updated successfully!'});
        } catch (err) {
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Preview Section */}
                    <div className="flex flex-col items-center gap-3 py-2">
                        <Avatar
                            src={formData.avatarUrl}
                            fallback={formData.username}
                            size="xl"
                        />
                        <span className="text-xs text-(--color-muted) font-mono">
                            Preview
                        </span>
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

                        <Input
                            label="Avatar URL"
                            placeholder="https://..."
                            value={formData.avatarUrl}
                            onChange={(e) => setFormData({...formData, avatarUrl: e.target.value})}
                            helperText="Paste a link to your profile picture"
                        />

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-(--color-text)">
                                Bio
                            </label>
                            <textarea
                                className="bg-(--color-surface) text-(--color-text) border border-(--color-border) rounded p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-(--color-primary) disabled:opacity-50 transition-all"
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