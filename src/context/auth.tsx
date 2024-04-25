'use client'

import React, { createContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import BASE_URL from '@/lib/axios';

interface IAuthContext {
  token: string | null
  signin: ({ authToken }: { authToken: string }, callback: () => void) => void
  signout: () => void
  hasToken: ({ authToken }: { authToken: string }, callback: () => void) => void
}

const config = {
  token: '',
  signin: () => null,
  signout: () => null,
  hasToken: () => null,
}


const AuthContext = createContext<IAuthContext>(config);

export function AuthProvider({ children }: { children: React.ReactNode}) {
  const [token, setToken] = useState<string | null>(null);

  const hasToken = ({ authToken }: { authToken: string }, callback: () => void) => {
    setToken(authToken);

    if (authToken) {
      BASE_URL.defaults.headers.Authorization = `Bearer ${authToken}`;
    }
    callback();
  };

  const signin = ({ authToken }: { authToken: string }, callback: () => void) => {
    setToken(authToken);

    setTimeout(() => {
      callback();

      Cookies.set('token', authToken, { expires: 2 });

      BASE_URL.defaults.headers.Authorization = `Bearer ${authToken}`;
    }, 100); // Fake async
  };

  const signout = () => {
    setToken(null);
    Cookies.remove('token');
    localStorage.removeItem('from')
    delete BASE_URL.defaults.headers.Authorization;
  };

  const value = useMemo<IAuthContext>(
    () => ({
      token,
      signin,
      signout,
      hasToken,
    }),
    [token, signin, signout, hasToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
