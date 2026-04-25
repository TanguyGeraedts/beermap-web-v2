export const themes = {
  light: {
    label: 'Light',
    description: 'Bright and clean for daytime logging.'
  },
  dark: {
    label: 'Dark',
    description: 'Lower glare for late-night map checks.'
  }
} as const;

export type ThemeName = keyof typeof themes;

export const defaultTheme: ThemeName = 'light';

export const themeNames = Object.keys(themes) as ThemeName[];
