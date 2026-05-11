import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Input, Alert } from "@/components/ui";
import { useMeController } from "@/hooks/useMeController";

export const CreateProfilePage = () => {
    const navigate = useNavigate();
    const { createProfile } = useMeController();

    const [step, setStep] = useState<1 | 2>(1);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        avatarUrl: ''
    });

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.username.trim()) {
            setError(null);
            setStep(2);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await createProfile({
                username: formData.username,
                bio: formData.bio || undefined,
                avatarUrl: formData.avatarUrl || undefined
            });

            // Redirect to home or map after successful creation
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="grid min-h-dvh place-items-center p-6 bg-(--color-background)">
            <Card className="w-full max-w-md shadow-xl overflow-visible" variant="elevated">
                <Card.Header className="text-center space-y-1">
                    <h1 className="text-2xl font-bold text-(--color-text)">
                        {step === 1 ? 'Choose your name' : 'Final touches'}
                    </h1>
                    <div className="flex justify-center gap-2 mt-2">
                        <div className={`h-1.5 w-10 rounded-full transition-colors ${step >= 1 ? 'bg-(--color-primary)' : 'bg-(--color-border)'}`} />
                        <div className={`h-1.5 w-10 rounded-full transition-colors ${step >= 2 ? 'bg-(--color-primary)' : 'bg-(--color-border)'}`} />
                    </div>
                </Card.Header>

                <Card.Body>
                    {error && (
                        <Alert variant="error" title="Error" className="mb-6" onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    {step === 1 ? (
                        /* PHASE 1: USERNAME (Required) */
                        <form onSubmit={handleNext} className="space-y-6">
                            <Input
                                label="Username"
                                placeholder="Tanguy"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                autoFocus
                                required
                                helperText="This is your unique identity on BeerMap."
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={!formData.username.trim()}
                            >
                                Continue
                            </Button>
                        </form>
                    ) : (
                        /* PHASE 2: BIO & AVATAR (Optional) */
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex flex-col items-center gap-3 py-2">
                                <Avatar
                                    size="xl"
                                    src={formData.avatarUrl}
                                    fallback={formData.username}
                                />
                                <span className="text-xs font-medium text-(--color-muted) uppercase tracking-wider">
                                    Profile Preview
                                </span>
                            </div>

                            <Input
                                label="Avatar Image URL"
                                placeholder="https://..."
                                value={formData.avatarUrl}
                                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                                helperText="Leave blank to use your auto-generated avatar."
                            />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-(--color-text)">Bio</label>
                                <textarea
                                    className="w-full p-3 bg-(--color-surface) text-(--color-text) border border-(--color-border) rounded focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-all min-h-[100px] text-sm placeholder:text-(--color-muted)"
                                    placeholder="I like IPAs and long walks to the brewery..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                        </div>
                    )}
                </Card.Body>

                <Card.Footer>
                    {step === 2 && (
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => setStep(1)}
                                disabled={isLoading}
                            >
                                Back
                            </Button>
                            <Button
                                variant="primary"
                                className="flex-1"
                                isLoading={isLoading}
                                onClick={handleSubmit}
                            >
                                Create Profile
                            </Button>
                        </div>
                    )}
                </Card.Footer>
            </Card>
        </main>
    );
};