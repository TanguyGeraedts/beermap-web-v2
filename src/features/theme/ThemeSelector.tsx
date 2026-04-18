import { Button, Card } from '../../shared/ui';
import { useTheme } from './useTheme';
import { themeNames, themes } from './themes';

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid gap-3">
      {themeNames.map((themeName) => {
        const option = themes[themeName];
        const isActive = themeName === theme;

        return (
          <Card
            className="flex items-center justify-between gap-4"
            key={themeName}
          >
            <div>
              <p className="font-semibold text-[var(--color-text)]">
                {option.label}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                {option.description}
              </p>
            </div>
            <Button
              size="sm"
              variant={isActive ? 'primary' : 'secondary'}
              onClick={() => setTheme(themeName)}
            >
              {isActive ? 'Active' : 'Use'}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};
