import { useContext } from 'react';
import { ProfileContext } from './profileContext';

export const useMe = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useMe must be used inside ProfileGate');
  }

  return context;
};
