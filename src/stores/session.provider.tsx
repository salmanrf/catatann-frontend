import { createContext, useContext, useEffect, useState } from 'react';
import {
  addAxiosInterceptor,
  removeAxiosInterceptor,
} from '../apis/axios-instance';
import {
  fetchLogin,
  fetchLogout,
  fetchRefreshToken,
  fetchSelf,
  fetchSignup,
} from '../apis/users-api';
import { LoginDto, SignupDto, User } from '../models/users.model';

export interface SessionState {
  logged_in: boolean;
  is_initialized: boolean;
  loading: boolean;
  user: User;
  login(dto: LoginDto): Promise<void>;
  logout(): Promise<void>;
  signup(dto: SignupDto): Promise<void>;
}

const userDefaultValues = {
  user_id: '',
  full_name: '',
  email: '',
  picture_url: '',
  created_at: '',
  updated_at: '',
};

const SessionContext = createContext<SessionState>({
  logged_in: false,
  is_initialized: false,
  loading: false,
  user: {
    ...userDefaultValues,
  },
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export function useSession() {
  const session = useContext(SessionContext);

  return session;
}

function addAuthInterceptor(access_token = '') {
  addAxiosInterceptor('request', (config) => {
    config.headers.Authorization = `Bearer ${access_token}`;

    return config;
  });
}

function refreshAuthInterceptor(access_token: string) {
  removeAxiosInterceptor('request');

  addAuthInterceptor(access_token);
}

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<SessionState>({
    logged_in: false,
    is_initialized: false,
    loading: false,
    user: { ...userDefaultValues },
    login,
    logout,
    signup,
  });
  const [accessToken, setAccessToken] = useState('');
  const [rotationTimeout, setRotationTimeout] = useState<any>(-1);

  useEffect(() => {
    initSession();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      clearInterval(rotationTimeout);
    } else {
      refreshAuthInterceptor(accessToken);

      // ? Rotate Refresh Token every 9 minutes (access token expires in 10 minutes)
      setRotationTimeout(setTimeout(initSession, 1000 * 60 * 9));
    }
  }, [accessToken]);

  function initSession() {
    fetchRefreshToken()
      .then(({ access_token }) => {
        if (access_token) {
          setAccessToken(access_token);
        }
      })
      .catch((error) => {})
      .finally(() => setTimeout(initSelf, 0));
  }

  async function initSelf() {
    try {
      setSession((prev) => ({ ...prev, loading: true }));

      const user = await fetchSelf();

      setSession((prev) => ({ ...prev, user, logged_in: true }));
    } catch (error) {
      setSession((prev) => ({ ...prev, logged_in: false }));
    } finally {
      setTimeout(
        () =>
          setSession((prev) => ({
            ...prev,
            loading: false,
            is_initialized: true,
          })),
        0
      );
    }
  }

  async function login(dto: any) {
    setSession((prev) => ({ ...prev, loading: true }));

    try {
      const { access_token } = await fetchLogin(dto);

      if (access_token) {
        refreshAuthInterceptor(access_token);
      }

      return await initSelf();
    } catch (error) {
    } finally {
      setSession((prev) => ({ ...prev, loading: false }));
    }
  }

  async function signup(dto: any) {
    setSession((prev) => ({ ...prev, loading: true }));

    try {
      const res = await fetchSignup(dto);
    } catch (error) {
    } finally {
      setSession((prev) => ({ ...prev, loading: false }));
    }
  }

  async function logout() {
    setSession((prev) => ({ ...prev, loading: true }));

    try {
      await fetchLogout();

      setSession((prev) => ({
        ...prev,
        is_initialized: false,
        logged_in: false,
        user: { ...userDefaultValues },
      }));

      removeAxiosInterceptor('request');
    } catch (errpr) {
    } finally {
      setTimeout(() => setSession((prev) => ({ ...prev, loading: false })), 0);
    }
  }

  return (
    <SessionContext.Provider value={{ ...session }}>
      {children}
    </SessionContext.Provider>
  );
};
