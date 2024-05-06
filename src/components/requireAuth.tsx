'use client'

import React, { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import AuthContext from '@/context/auth';
import BASE_URL from '@/lib/axios';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false)

  const { token, signout } = useContext(AuthContext);

  const location = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    const resInterceptor = (response: any) => response;

    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        signout();
        navigate.replace('/login');
      }

      return Promise.reject(error);
    };

    const interceptor = BASE_URL.interceptors.response.use(
      resInterceptor,
      errInterceptor,
    );

    return () => BASE_URL.interceptors.response.eject(interceptor);
  }, [navigate]);

  const tokenCookie = Cookies.get('token')

  useEffect(() => {
    if (!tokenCookie) {
      navigate.replace('/login')
    } else {
      setAuth(true)
    }

    console.log(token)
  }, [tokenCookie])

  return (auth || location === '/login') && children;
}

export default RequireAuth;
