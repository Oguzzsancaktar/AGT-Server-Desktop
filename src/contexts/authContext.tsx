import { createContext, useContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import IUserToken from '../models/entities/auth/IUserToken';

// Libs.
import axiosInstance from '../api/axiosInstance';
import { opcClientConnect } from '../api/services';

const AuthStateContext = createContext<{ loggedUser: IUserToken | null }>({
  loggedUser: null,
});

const AuthApiContext = createContext({
  login: (token: string): string => {
    return '';
  },
  logout: () => { },
});

const useAuthStateContext = () => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error('useAuthStateContext must be used within a AuthProvider');
  }

  return context;
};

const useAuthApiContext = () => {
  const context = useContext(AuthApiContext);

  if (!context) {
    throw new Error('useAuthApiContext must be used within a AuthProvider');
  }

  return context;
};

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null | string>(null);

  const authApi = useMemo(() => {
    return {
      login: async (token: string) => {
        await opcClientConnect()
        Cookies.set('token', token);

        axiosInstance.interceptors.request.use(
          (config: any) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          },
          (error: any) => {
            return Promise.reject(error);
          }
        );

        setUser(JSON.parse(token));
        return token;
      },
      logout: () => {
        Cookies.remove('token');
        setUser(null);
      },
    };
  }, [setUser]);

  return (
    <AuthStateContext.Provider
      value={{
        loggedUser: user,
      }}
    >
      <AuthApiContext.Provider value={authApi}>
        {children}
      </AuthApiContext.Provider>
    </AuthStateContext.Provider>
  );
}

export { AuthProvider, useAuthStateContext, useAuthApiContext };
