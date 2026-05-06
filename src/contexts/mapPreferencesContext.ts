import { createContext } from 'react';
import type { MapStyle } from '@/types';

export type MapPreferencesContextValue = {
  mapStyle: MapStyle;
  setMapStyle: (style: MapStyle) => void;
};

export const MapPreferencesContext =
  createContext<MapPreferencesContextValue | undefined>(undefined);
