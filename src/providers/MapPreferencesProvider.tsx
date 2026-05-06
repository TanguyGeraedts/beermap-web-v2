import { useMemo, useState, type ReactNode } from 'react';
import { MapPreferencesContext } from '@/contexts/mapPreferencesContext';
import type { MapStyle } from '@/types';

const storageKey = 'beermap-map-style';
const mapStyles: MapStyle[] = ['normal', 'light', 'dark'];

const isMapStyle = (value: string | null): value is MapStyle => {
  return mapStyles.includes(value as MapStyle);
};

type MapPreferencesProviderProps = {
  children: ReactNode;
};

export const MapPreferencesProvider = ({
  children
}: MapPreferencesProviderProps) => {
  const [mapStyle, setMapStyleState] = useState<MapStyle>(() => {
    if (typeof window === 'undefined') {
      return 'normal';
    }

    const storedMapStyle = window.localStorage.getItem(storageKey);
    return isMapStyle(storedMapStyle) ? storedMapStyle : 'normal';
  });

  const setMapStyle = (style: MapStyle) => {
    setMapStyleState(style);
    window.localStorage.setItem(storageKey, style);
  };

  const value = useMemo(() => ({ mapStyle, setMapStyle }), [mapStyle]);

  return (
    <MapPreferencesContext.Provider value={value}>
      {children}
    </MapPreferencesContext.Provider>
  );
};
