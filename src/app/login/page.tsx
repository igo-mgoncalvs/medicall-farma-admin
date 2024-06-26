'use client'

import { useCallback, useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton';
import Image from 'next/image';
import Cookies from 'js-cookie';

import email from '@/components/icons/email.svg'
import password from '@/components/icons/password.svg'
import passwordVisible from '@/components/icons/passwordVisible.svg'

import styles from './styles.module.css'
import { usePathname, useRouter } from 'next/navigation';
import AuthContext from '@/context/auth';

interface ILogin {
  email: string
  password: string
}

export default function Login () {
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<ILogin>()

  const navigate = useRouter();
  const useAuth = useContext(AuthContext)

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      useAuth.hasToken(
        {
          authToken: token,
        },
        () => {
          navigate.replace('/');
        },
      );
    }
  }, [navigate]);

  const onSubmit = useCallback(({email, password}: ILogin) => {
    setLoading(true)
    useAuth.signin({ email, password }, () => {
      setLoading(false)
      navigate.replace('/');
    }, () => {
      setLoading(false)
    });
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.login}> 
        <div className={styles.iconContainer}>
          <img
            alt="logo-medicall-farma"
            src={'https://i.postimg.cc/JzgW26WR/Group-1-2.png'}
            className={styles.logo}
          />

          <h1>Medicall Farma</h1>
          <p className={styles.titleText}>Faça login e comece a usar</p>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='email'
            render={({field: { onChange }, fieldState: {error}}) => (
              <div className={styles.inputContainer}>
                <p>
                  Endereço de e-mail
                </p>
                <div>
                  <Image
                    src={email}
                    alt='logo para sair'
                  />
                  <input
                    type='email'
                    placeholder='Digite seu e-mail'
                    autoComplete='email webauthn'
                    onChange={onChange}
                    className={styles.input}
                  />
                </div>
              </div>
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({field: { onChange }, fieldState: {error}}) => (
              <div className={styles.inputContainer}>
                <p>
                Sua senha
                </p>
                <div>
                  <Image
                    src={showPassword ? passwordVisible : password}
                    className={styles.inputPassword}
                    alt='logo para sair'
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  
                  <input
                    className={styles.input}
                    onChange={onChange}
                    autoComplete='current-password webauthn'
                    placeholder='Digite sua senha'
                    type='password'
                    security=''
                  />
                </div>
              </div>
            )}
          />

        <LoadingButton
          variant='contained'
          className={styles.button}
          loading={loading}
          type='submit'
        >
          Entrar na plataforma
        </LoadingButton>
        </form>
      </div>
    </div>
  )
}