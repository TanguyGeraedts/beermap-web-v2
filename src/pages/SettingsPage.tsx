import { ThemeSelector } from '../features/theme/ThemeSelector';
import { Card, PageHeader } from '../shared/ui';

export const SettingsPage = () => {
  return (
    <div className="grid gap-6">
      <PageHeader
        eyebrow="Settings"
        title="Make it yours."
        description="Theme choices are stored locally for now and can later sync to your profile."
      />
      <Card>
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Theme
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          Add a new named theme in the theme files and the app can switch to it.
        </p>
        <div className="mt-5">
          <ThemeSelector />
        </div>
      </Card>
    </div>
  );
};
