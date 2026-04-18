import {
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Field,
  Input,
  PageHeader
} from '../shared/ui';

export const UiComponentsPage = () => {
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
