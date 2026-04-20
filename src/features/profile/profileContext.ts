import { createContext } from 'react';
import type { CreateProfileRequest, MeResponse } from '../../shared/types';

export type ProfileContextValue = {
  profile: MeResponse | null;
  needsSetup: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createProfile: (payload: CreateProfileRequest) => Promise<MeResponse>;
  uploadProfileImage: (file: File) => Promise<string>;
};

export const ProfileContext = createContext<ProfileContextValue | null>(null);
