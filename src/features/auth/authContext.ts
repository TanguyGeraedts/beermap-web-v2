import { createContext } from 'react';
import type Keycloak from 'keycloak-js';
import type { KeycloakLoginOptions } from 'keycloak-js';
import type { AuthUser } from '../../shared/types';

export type AuthContextValue = {
  keycloak: Keycloak;
  accessToken: string | undefined;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (options?: KeycloakLoginOptions) => void;
  loginWithGoogle: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
