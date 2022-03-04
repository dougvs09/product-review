import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, db } from '@services/firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { api } from 'utils/api';
import { v4 as uuidv4 } from 'uuid';

type AuthContextProviderTypes = {
  children: ReactNode;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  token: string;
};

export type AuthContextType = {
  user: User | null | undefined;
  SignIn: (
    providerName: string,
    email?: string,
    password?: string
  ) => Promise<void>;
  SignOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({ children }: AuthContextProviderTypes) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (data) => {
      if (data) {
        const token = await data.getIdToken();

        const userData = {
          id: data.uid,
          name: data.displayName || 'Nome não forncecido',
          email: data.email || 'Email não fornecido',
          avatarUrl: data.photoURL || 'Foto não fornceda',
          token,
        };

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        document.cookie = `token=${token}`;

        setUser(userData);
      }
    });

    return unsubscribe;
  }, []);

  const SignIn = async (
    providerName: string,
    email?: string,
    password?: string
  ) => {
    if (providerName === 'google') {
      const provider = new GoogleAuthProvider();
      const signIn = await signInWithPopup(auth, provider);

      if (signIn.user) {
        const token = await signIn.user.getIdToken();

        const userData = {
          id: signIn.user.uid,
          name: signIn.user.displayName || 'Nome não forncecido',
          email: signIn.user.email || 'Email não fornecido',
          avatarUrl: signIn.user.photoURL || 'Foto não fornceda',
          token,
        };

        if (auth.currentUser) {
          if (auth.currentUser.providerData.length === 1) {
            const credential = EmailAuthProvider.credential(
              auth.currentUser.email || '',
              uuidv4()
            );
            await linkWithCredential(auth.currentUser, credential);
            api.post('user', {
              id: signIn.user.uid,
              name: signIn.user.displayName,
              email: signIn.user.email,
              avatarUrl: signIn.user.photoURL,
            });
          }
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        document.cookie = `[token]=[${token}]`;

        setUser(userData);
      }
    } else if (providerName === 'github') {
      const provider = new GithubAuthProvider();
      const signIn = await signInWithPopup(auth, provider);

      if (signIn.user) {
        const token = await signIn.user.getIdToken();

        const userData = {
          id: signIn.user.uid,
          name: signIn.user.displayName || 'Nome não forncecido',
          email: signIn.user.email || 'Email não fornecido',
          avatarUrl: signIn.user.photoURL || 'Foto não fornceda',
          token,
        };

        if (auth.currentUser) {
          if (auth.currentUser.providerData.length === 1) {
            const credential = EmailAuthProvider.credential(
              auth.currentUser.email || '',
              uuidv4()
            );
            await linkWithCredential(auth.currentUser, credential);
            api.post('user', {
              id: signIn.user.uid,
              name: signIn.user.displayName,
              email: signIn.user.email,
              avatarUrl: signIn.user.photoURL,
            });
          }
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        document.cookie = `token=${token}`;

        setUser(userData);
      }
    } else if (providerName === 'password' && email && password) {
      const signIn = await signInWithEmailAndPassword(auth, email, password);

      if (signIn.user) {
        const token = await signIn.user.getIdToken();

        const userData = {
          id: signIn.user.uid,
          name: signIn.user.displayName || 'Nome não forncecido',
          email: signIn.user.email || 'Email não fornecido',
          avatarUrl: signIn.user.photoURL || 'Foto não fornceda',
          token,
        };

        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        document.cookie = `token=${token}`;

        setUser(userData);
      }
    }
  };

  const SignOut = async () => {
    await signOut(auth);
    document.cookie = 'token=';
    window.location.reload();
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
