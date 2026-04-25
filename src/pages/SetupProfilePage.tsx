import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Field, Input, PageHeader } from '@/components/ui';
import { useMe } from '@/hooks/useMe';

type SetupStep = 'name' | 'details';

export const SetupProfilePage = () => {
  const navigate = useNavigate();
  const { createProfile, error, isLoading, uploadProfileImage } = useMe();
  const [step, setStep] = useState<SetupStep>('name');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const trimmedUsername = username.trim();
  const canContinue = trimmedUsername.length >= 2;
  const stepNumber = step === 'name' ? 1 : 2;

  const avatarLabel = useMemo(() => {
    if (!avatarFile) return 'Choose image';
    return avatarFile.name;
  }, [avatarFile]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleNameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canContinue) {
      setFormError('Use at least 2 characters for your name.');
      return;
    }

    setFormError(null);
    setStep('details');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const avatarUrl = avatarFile
      ? await uploadProfileImage(avatarFile)
      : null;

    await createProfile({
      username: trimmedUsername,
      bio: bio || null,
      avatarUrl
    });

    navigate('/profile', { replace: true });
  };

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow={`Setup ${stepNumber}/2`}
        title="Create your BeerMap profile."
        description={
          step === 'name'
            ? 'Pick the name people will see next to your logs and sessions.'
            : 'This part is optional. Add a photo and short description now, or skip both for later.'
        }
      />

      <Card>
        {step === 'name' ? (
          <form className="grid gap-5" onSubmit={handleNameSubmit}>
            <Field
              label="Name"
              htmlFor="username"
              hint="You can change this later."
              error={formError ?? undefined}
            >
              <Input
                id="username"
                minLength={2}
                maxLength={32}
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Your name"
              />
            </Field>

            <Button disabled={!canContinue} type="submit">
              Continue
            </Button>
          </form>
        ) : (
          <form
            className="grid gap-5"
            onSubmit={(event) => void handleSubmit(event)}
          >
            <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--color-text)]">
                Optional
              </p>
              <p className="mt-1 text-sm leading-5 text-[var(--color-muted)]">
                You can create your profile without a picture or description.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {avatarPreview ? (
                <img
                  className="size-20 rounded-lg object-cover"
                  src={avatarPreview}
                  alt="Profile preview"
                />
              ) : (
                <div className="grid size-20 place-items-center rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]">
                  <Upload className="size-6" aria-hidden="true" />
                </div>
              )}
              <Field
                label="Profile image"
                htmlFor="avatar"
                hint="Optional. Add one now or leave it empty."
              >
                <label className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-text)] shadow-sm">
                  {avatarLabel}
                  <input
                    id="avatar"
                    className="sr-only"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </Field>
            </div>

            <Field
              label="Description"
              htmlFor="bio"
              hint="Optional. A short line about you."
            >
              <textarea
                id="bio"
                className="min-h-28 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 text-sm text-[var(--color-text)] shadow-sm outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring-soft)]"
                maxLength={160}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Add a short description"
              />
            </Field>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <div className="grid gap-3">
              <Button disabled={isLoading} type="submit">
                Create profile
              </Button>
              <Button
                disabled={isLoading}
                type="button"
                variant="secondary"
                onClick={() => setStep('name')}
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
