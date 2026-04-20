import { useCallback, useState } from 'react';
import { isAxiosError } from 'axios';
import { profileService } from './profileService';
import type { ProfileContextValue } from './profileContext';
import type {
  CreateProfileRequest,
  MeResponse,
  UpdateProfileRequest
} from '../../shared/types';

const isSetupRequired = (
  value: unknown
): value is { type: 'ACCOUNT_SETUP_REQUIRED' } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'ACCOUNT_SETUP_REQUIRED'
  );
};

export const useMeController = (): ProfileContextValue => {
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMe = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await profileService.getMe();

      if (isSetupRequired(data)) {
        setProfile(null);
        setNeedsSetup(true);
        return;
      }

      setProfile(data);
      setNeedsSetup(false);
    } catch (err) {
      setProfile(null);

      if (isAxiosError(err) && err.response?.status === 404) {
        setNeedsSetup(true);
        return;
      }

      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProfile = useCallback(async (payload: CreateProfileRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const createdProfile = await profileService.createMe(payload);
      setProfile(createdProfile);
      setNeedsSetup(false);
      return createdProfile;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create profile';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (payload: UpdateProfileRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedProfile = await profileService.updateMe(payload);
      setProfile(updatedProfile);
      setNeedsSetup(false);
      return updatedProfile;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update profile';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadProfileImage = useCallback(async (file: File) => {
    setError(null);

    try {
      return await profileService.uploadProfileImage(file);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to upload profile image';
      setError(message);
      throw err;
    }
  }, []);

  return {
    profile,
    needsSetup,
    isLoading,
    error,
    refetch: fetchMe,
    createProfile,
    updateProfile,
    uploadProfileImage
  };
};
