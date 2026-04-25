import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button, Card, Field, Input, PageHeader } from '@/components/ui';
import { useMe } from '@/hooks/useMe';
import { cn } from '@/utils/cn';

const BIO_MAX_LENGTH = 180;

const hasPremiumAccess = (accountType: string | undefined) => {
  return accountType === 'PREMIUM' || accountType === 'ADMIN';
};

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const { error, isLoading, profile, updateProfile, uploadProfileImage } =
      useMe();

  const [username, setUsername] = useState(profile?.username ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [discriminator, setDiscriminator] = useState(
      profile?.discriminator ?? ''
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const canEditDiscriminator = hasPremiumAccess(profile?.accountType);
  const trimmedUsername = username.trim();
  const normalizedDiscriminator = discriminator.trim();
  const avatarInitial = profile?.username.charAt(0).toUpperCase() || 'B';

  const avatarLabel = useMemo(() => {
    if (!avatarFile) return 'Choose image';
    return avatarFile.name;
  }, [avatarFile]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (trimmedUsername.length < 2) {
      setFormError('Use at least 2 characters for your name.');
      return;
    }

    if (canEditDiscriminator && !/^\d{4}$/.test(normalizedDiscriminator)) {
      setFormError('Discriminator must be 4 numbers.');
      return;
    }

    const avatarUrl = avatarFile
        ? await uploadProfileImage(avatarFile)
        : profile?.avatarUrl ?? null;

    await updateProfile({
      username: trimmedUsername,
      bio,
      avatarUrl,
      discriminator: canEditDiscriminator ? normalizedDiscriminator : null
    });

    navigate('/profile', { replace: true });
  };

  if (!profile) {
    return <Navigate to="/profile" replace />;
  }

  return (
      <div className="grid gap-6">
        <PageHeader
            eyebrow="Profile"
            title="Edit profile"
            description="Update your public profile."
        />

        <Card>
          <form className="grid gap-5" onSubmit={(event) => void handleSubmit(event)}>
            <div className="flex items-center gap-4">
              {avatarPreview || profile.avatarUrl ? (
                  <img
                      className="size-20 rounded-lg object-cover"
                      src={avatarPreview ?? profile.avatarUrl ?? undefined}
                      alt="Profile preview"
                  />
              ) : (
                  <div className="grid size-20 place-items-center rounded-lg bg-[var(--color-surface-muted)] text-3xl font-bold text-[var(--color-text)]">
                    {avatarInitial}
                  </div>
              )}
              <Field label="Profile image" htmlFor="avatar" hint="Optional">
                <label className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-sm font-semibold text-[var(--color-text)] shadow-sm hover:border-[var(--color-primary)] transition-colors">
                  <Upload className="mr-2 size-4" aria-hidden="true" />
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

            <Field label="Name" htmlFor="username" error={formError ?? undefined}>
              <Input
                  id="username"
                  minLength={2}
                  maxLength={32}
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
              />
            </Field>

            <Field label="Description" htmlFor="bio" hint="Optional">
              <div className="relative">
              <textarea
                  id="bio"
                  className={cn(
                      "min-h-28 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 pb-9 text-sm text-[var(--color-text)] shadow-sm outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-ring-soft)]",
                      bio.length > BIO_MAX_LENGTH && "border-rose-500"
                  )}
                  maxLength={BIO_MAX_LENGTH}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Add a short description"
              />
                <div className="absolute bottom-2.5 right-3 pointer-events-none flex items-baseline gap-0.5 text-[10px] font-bold uppercase tracking-wider">
                <span className={cn(
                    bio.length >= BIO_MAX_LENGTH ? "text-rose-500" : "text-[var(--color-muted)]"
                )}>
                  {bio.length}
                </span>
                  <span className="text-[var(--color-muted)]">/ {BIO_MAX_LENGTH}</span>
                </div>
              </div>
            </Field>

            <Field
                label="Discriminator (4 numbers)"
                htmlFor="discriminator"
                hint={
                  canEditDiscriminator
                      ? 'Use exactly 4 numbers, like 2423.'
                      : undefined
                }
            >
              <div className="grid gap-2">
                {!canEditDiscriminator ? (
                    <span className="w-fit rounded-lg border border-[#d79a18] bg-[#f8e3a3] px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#6f4b05]">
                  Premium feature
                </span>
                ) : null}
                <Input
                    id="discriminator"
                    className={
                      canEditDiscriminator
                          ? 'font-mono tracking-[0.25em]'
                          : 'cursor-not-allowed border-dashed bg-[var(--color-surface-muted)] font-mono tracking-[0.25em] text-[var(--color-muted)] opacity-70'
                    }
                    disabled={!canEditDiscriminator}
                    inputMode="numeric"
                    maxLength={4}
                    minLength={4}
                    pattern="[0-9]{4}"
                    placeholder="0000"
                    value={discriminator}
                    onChange={(event) => setDiscriminator(event.target.value)}
                />
              </div>
            </Field>

            {error ? <p className="text-sm text-rose-600 font-medium">{error}</p> : null}

            <div className="grid gap-3 pt-2">
              <Button disabled={isLoading} type="submit">
                {isLoading ? 'Saving...' : 'Save profile'}
              </Button>
              <Button
                  disabled={isLoading}
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/profile')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
  );
};
