import {
  AuthError,
  AuthSession,
  AuthTokenResponse,
  User as AuthUser,
} from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { PasswordSignIn } from '../types/password-sign-in.type';
import { User } from '../types/user/user';
import { getUser } from '../services/api.service';
import supabase from '../../lib/supabase/supabase.lib';
import { useQuery } from 'react-query';
import { useRouter } from 'expo-router';

type AuthContextValue = {
  session: AuthSession | null;
  error: AuthError | null;

  user: User | null;
  setUser: (user: User | null) => void;
  userLoading: boolean;
  userError: boolean;

  signUpWithPassword: (data: PasswordSignIn) => void;
  signUpLoading: boolean;
  signUpError: AuthError | null;
  signUpSuccess: boolean;

  signInWithPassword: (data: PasswordSignIn) => void;
  signInLoading: boolean;
  signInError: AuthError | null;

  logout: () => void;
};

const AuthContext = createContext({} as AuthContextValue);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [session, setSession] = useState<AuthSession | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState<AuthError | null>(null);

  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState<AuthError | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const { isError: userError, isLoading: userLoading } = useQuery<User>(
    `user-${authUser?.id}`,
    () => getUser(session!.access_token),
    {
      enabled: Boolean(session?.access_token && authUser),
      retry: false,
      onSuccess: (data) => {
        console.log('🚀 ~ file: auth.context.tsx:65 ~ fetched user');
        setUser(data);
      },
      onError: (error) => {
        console.error('error', error);
      },
    }
  );

  useEffect(() => {
    (async () => {
      const { data, error: _error } = await supabase.auth.getSession();

      if (_error) {
        console.error(_error);
        setError(_error);
        return;
      }

      setSession(data?.session ?? null);
      setAuthUser(data?.session?.user ?? null);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_OUT') {
            setUser(null);
          }

          setSession(session);
          setAuthUser(session?.user ?? null);

          // TODO handle specific auth events:
          // if (event === 'PASSWORD_RECOVERY') handlePasswordRecovery();
          // if (event === 'USER_UPDATED') handleUserUpdated();
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    })();
  }, []);

  const signUpWithPassword = async (data: PasswordSignIn) => {
    setSignUpLoading(true);

    const { data: _data, error: _error } = await supabase.auth.signUp(data);

    if (_error) {
      console.error(_error);
      setSignUpError(_error);
      setSignUpLoading(false);
      return;
    }

    setSignUpError(null);
    setSignUpLoading(false);
    setSignUpSuccess(true);
  };

  const signInWithPassword = async (data: PasswordSignIn) => {
    setSignInLoading(true);

    const { error: _error } = await supabase.auth.signInWithPassword(data);

    if (_error) {
      console.error(_error);
      setSignInError(_error);
      setSignInLoading(false);
      return;
    }

    setSignInError(null);
    setSignInLoading(false);
    router.push('/(tabs)/user');
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextValue = {
    session,
    error,

    user,
    setUser,
    userLoading,
    userError,

    signUpWithPassword,
    signUpLoading,
    signUpError,
    signUpSuccess,

    signInWithPassword,
    signInLoading,
    signInError,

    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
