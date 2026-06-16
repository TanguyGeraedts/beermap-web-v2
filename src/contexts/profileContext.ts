import { createContext } from 'react';
import type { RefetchOptions, QueryObserverResult } from '@tanstack/react-query';
import type {
  CreateProfileRequest,
  MeResponse,
  UpdateProfileRequest
} from '@/types';

export type ProfileContextValue = {
  profile: MeResponse | null;
  needsSetup: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<MeResponse | null, Error>>;
  createProfile: (payload: CreateProfileRequest) => Promise<MeResponse>;
  updateProfile: (payload: UpdateProfileRequest) => Promise<MeResponse>;
  uploadProfileImage: (file: File) => Promise<string>;
};

export const ProfileContext = createContext<ProfileContextValue | null>(null);