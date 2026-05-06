import { useState } from 'react';
import {
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Field,
  Input,
  PageHeader
} from '@/components/ui';
import { checkForPwaUpdate } from '@/utils/pwa';

export const UiComponentsPage = () => {
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  const handlePwaUpdate = async () => {
    setIsCheckingUpdate(true);
    setUpdateStatus(null);

    try {
      const hasServiceWorker = await checkForPwaUpdate();

      setUpdateStatus(
        hasServiceWorker
          ? 'Checked for updates. If a new version exists, the app will refresh automatically.'
          : 'No service worker registration found yet.'
      );
    } catch {
      setUpdateStatus('Update check failed.');
    } finally {
      setIsCheckingUpdate(false);
    }
  };

  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Dev only"
        title="UI components"
        description="A small workshop for the reusable pieces in this app."
      />

      <Card>
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Buttons
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          PWA updates
        </h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Force an update check and apply the latest version.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={handlePwaUpdate} disabled={isCheckingUpdate}>
            {isCheckingUpdate ? 'Checking…' : 'Update app now'}
          </Button>
          {updateStatus ? (
            <span className="text-sm text-[var(--color-muted)]">
              {updateStatus}
            </span>
          ) : null}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Form field
        </h2>
        <div className="mt-4 grid gap-4">
          <Field
            label="Favorite drink"
            htmlFor="favorite-drink"
            hint="This is a preview input."
          >
            <Input id="favorite-drink" placeholder="Westmalle Tripel" />
          </Field>
          <Field label="Validation" htmlFor="validation" error="Required">
            <Input id="validation" invalid placeholder="Something went wrong" />
          </Field>
        </div>
      </Card>

      <EmptyState
        title="Empty state"
        description="Useful for logs, friends, sessions, and map results when there is nothing to show yet."
        action={
          <ButtonLink href="/profile" size="sm">
            Back to profile
          </ButtonLink>
        }
      />
    </div>
  );
};
