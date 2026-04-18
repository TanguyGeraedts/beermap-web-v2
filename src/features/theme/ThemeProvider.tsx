import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext } from './themeContext';
import { defaultTheme, themeNames, type ThemeName } from './themes';

const storageKey = 'beermap-theme';

const isThemeName = (value: string | null): value is ThemeName => {
  return themeNames.includes(value as ThemeName);
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return defaultTheme;

    const storedTheme = window.localStorage.getItem(storageKey);
    return isThemeName(storedTheme) ? storedTheme : defaultTheme;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
