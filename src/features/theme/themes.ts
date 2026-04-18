export const themes = {
  beermap: {
    label: 'BeerMap',
    description: 'Fresh, clear, and ready for the daily app.'
  },
  christmas: {
    label: 'Christmas',
    description: 'A seasonal skin for festive logging.'
  }
} as const;

export type ThemeName = keyof typeof themes;

export const defaultTheme: ThemeName = 'beermap';

export const themeNames = Object.keys(themes) as ThemeName[];
