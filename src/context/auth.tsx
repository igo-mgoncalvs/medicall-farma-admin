'use client'

import React, { createContext, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import BASE_URL from '@/lib/axios';
import { UserCredential, UserInfo, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { initializeApp } from 'firebase/app';

const configFirebase = {
  apiKey: "AIzaSyAaJsJcAooU49HPSSzgE5eUXtoxsXpOo70",
  authDomain: "medicall-farma.firebaseapp.com",
  databaseURL: "https://medicall-farma-default-rtdb.firebaseio.com",
  projectId: "medicall-farma",
  storageBucket: "medicall-farma.appspot.com",
  messagingSenderId: "560615912268",
  appId: "1:560615912268:web:1cf85af05418c3e91895e9"
}

export const app = initializeApp(configFirebase)

interface IAuthContext {
  token: string | null
  signin: ({email, password}: { email: string, password: string }, callback: () => void) => void
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
const auth = getAuth(app)

export function AuthProvider({ children }: { children: React.ReactNode}) {
  const [token, setToken] = useState<string | null>(null);

  const hasToken = ({ authToken }: { authToken: string }, callback: () => void) => {
    setToken(authToken);

    if (authToken) {
      BASE_URL.defaults.headers.Authorization = `Bearer ${authToken}`;
    }
    callback();
  };

  const signin = ({email, password}: { email: string, password: string }, callback: () => void) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (auth: UserCredential) => {
        const authToken = await auth.user.getIdToken()
        setToken(authToken)
        
        Cookies.set('token', authToken, { expires: 2 });

        BASE_URL.defaults.headers.Authorization = `Bearer ${authToken}`;
        callback()
      })
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
