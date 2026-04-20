import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import type { KeycloakLoginOptions, KeycloakTokenParsed } from 'keycloak-js';
import { setAccessToken } from '../../shared/api/authToken';
import type { AccountType, AuthUser } from '../../shared/types';
import { AuthContext } from './authContext';
import { keycloak } from './keycloak';

type AuthProviderProps = {
  children: ReactNode;
};

type BeerMapToken = KeycloakTokenParsed & {
  email?: string;
  name?: string;
  preferred_username?: string;
  accountType?: AccountType;
};

const googleIdentityProviderHint =
  import.meta.env.VITE_KEYCLOAK_GOOGLE_IDP_HINT || 'google';

const toAuthUser = (token: BeerMapToken | undefined): AuthUser | null => {
  if (!token?.sub) return null;

  return {
    id: token.sub,
    username: token.preferred_username,
    email: token.email,
    name: token.name,
    accountType: token.accountType
  };
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setTokenState] = useState<string | undefined>();
  const [user, setUser] = useState<AuthUser | null>(null);
  const initialized = useRef(false);
  const refreshInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const syncAuthState = useCallback((authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    setTokenState(keycloak.token);
    setUser(toAuthUser(keycloak.tokenParsed as BeerMapToken | undefined));
    setAccessToken(keycloak.token);
  }, []);

  const stopRefreshLoop = useCallback(() => {
    if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
      refreshInterval.current = null;
    }
  }, []);

  const clearAuthState = useCallback(() => {
    stopRefreshLoop();
    setIsAuthenticated(false);
    setTokenState(undefined);
    setUser(null);
    setAccessToken(undefined);
  }, [stopRefreshLoop]);

  const startRefreshLoop = useCallback(() => {
    stopRefreshLoop();

    refreshInterval.current = setInterval(() => {
      keycloak
        .updateToken(60)
        .then(() => syncAuthState(Boolean(keycloak.authenticated)))
        .catch(clearAuthState);
    }, 30_000);
  }, [clearAuthState, stopRefreshLoop, syncAuthState]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false
      })
      .then((authenticated) => {
        syncAuthState(authenticated);

        if (authenticated) {
          startRefreshLoop();
        }
      })
      .catch(clearAuthState)
      .finally(() => setIsLoading(false));

    const refreshWhenVisible = () => {
      if (document.visibilityState !== 'visible' || !keycloak.authenticated) {
        return;
      }

      keycloak
        .updateToken(60)
        .then(() => syncAuthState(Boolean(keycloak.authenticated)))
        .catch(clearAuthState);
    };

    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      document.removeEventListener('visibilitychange', refreshWhenVisible);
      stopRefreshLoop();
    };
  }, [clearAuthState, startRefreshLoop, stopRefreshLoop, syncAuthState]);

  const login = useCallback((options?: KeycloakLoginOptions) => {
    void keycloak.login(options);
  }, []);

  const loginWithGoogle = useCallback(() => {
    login({ idpHint: googleIdentityProviderHint });
  }, [login]);

  const logout = useCallback(() => {
    clearAuthState();
    void keycloak.logout({ redirectUri: window.location.origin });
  }, [clearAuthState]);

  const value = useMemo(
    () => ({
      keycloak,
      accessToken,
      user,
      isAuthenticated,
      isLoading,
      login,
      loginWithGoogle,
      logout
    }),
    [
      accessToken,
      isAuthenticated,
      isLoading,
      login,
      loginWithGoogle,
      logout,
      user
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
