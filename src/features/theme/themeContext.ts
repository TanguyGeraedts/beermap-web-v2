import { createContext } from 'react';
import type { ThemeName } from './themes';

export type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);
