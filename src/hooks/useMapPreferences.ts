import { useContext } from 'react';
import { MapPreferencesContext } from '@/contexts/mapPreferencesContext';

export const useMapPreferences = () => {
  const context = useContext(MapPreferencesContext);

  if (!context) {
    throw new Error('useMapPreferences must be used within MapPreferencesProvider');
  }

  return context;
};
