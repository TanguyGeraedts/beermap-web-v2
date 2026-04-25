export type AccountType = 'ADMIN' | 'PREMIUM' | 'NORMAL';

export interface AuthUser {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  accountType?: AccountType;
}

export interface MeResponse {
  id: string;
  username: string;
  usernameNormalized: string;
  discriminator: string;
  bio: string | null;
  avatarUrl: string | null;
  accountType: AccountType;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  username?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  discriminator?: string | null;
}

export interface CreateProfileRequest {
  username: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface AccountSetupRequiredResponse {
  type: 'ACCOUNT_SETUP_REQUIRED';
}

export type MeApiResponse = MeResponse | AccountSetupRequiredResponse;

export interface CreateUploadUrlResponse {
  key: string;
  uploadUrl: string;
  publicUrl: string;
}
