import { Moon, Sun } from 'lucide-react';
import { cn } from '../../shared/lib/cn';
import { useTheme } from './useTheme';

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="inline-grid h-8 w-16 grid-cols-2 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-1 text-[var(--color-muted)] shadow-sm transition"
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <span
        className={cn(
          'grid size-6 place-items-center rounded-full transition',
          !isDark
            ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
            : 'text-[var(--color-muted)]'
        )}
      >
        <Sun className="size-3.5" aria-hidden="true" />
      </span>
      <span
        className={cn(
          'grid size-6 place-items-center rounded-full transition',
          isDark
            ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)]'
            : 'text-[var(--color-muted)]'
        )}
      >
        <Moon className="size-3.5" aria-hidden="true" />
      </span>
    </button>
  );
};
