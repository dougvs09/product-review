import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth } from '@services/firebase';
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
import { v4 as uuidv4 } from 'uuid';

type AuthContextProviderTypes = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
};

type AuthContextType = {
  user: User | null | undefined;
  SignIn: (
    providerName: 'google' | 'github' | 'password',
    email?: string,
    password?: string
  ) => Promise<void>;
  SignOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderTypes) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      if (data) {
        const userData = {
          id: data.uid,
          name: data.displayName || 'Nome não forncecido',
          email: data.email || 'Email não fornecido',
          avatarUrl: data.photoURL || 'Foto não fornceda',
        };

        setUser(userData);
      }
    });

    return unsubscribe;
  }, []);

  const SignIn = async (
    providerName: 'google' | 'github' | 'password',
    email?: string,
    password?: string
  ) => {
    if (providerName === 'google') {
      const provider = new GoogleAuthProvider();
      const signIn = await signInWithPopup(auth, provider);

      if (signIn.user) {
        const userData = {
          id: signIn.user.uid,
          name: signIn.user.displayName || 'Nome não forncecido',
          email: signIn.user.email || 'Email não fornecido',
          avatarUrl: signIn.user.photoURL || 'Foto não fornceda',
        };

        if (auth.currentUser) {
          const credential = EmailAuthProvider.credential(
            userData.email || '',
            uuidv4()
          );
          await linkWithCredential(auth.currentUser, credential);
        }

        setUser(userData);
      }
    } else if (providerName === 'github') {
      const provider = new GithubAuthProvider();
      const signIn = await signInWithPopup(auth, provider);

      if (signIn.user) {
        const userData = {
          id: signIn.user.uid,
          name: signIn.user.displayName || 'Nome não forncecido',
          email: signIn.user.email || 'Email não fornecido',
          avatarUrl: signIn.user.photoURL || 'Foto não fornceda',
        };

        if (auth.currentUser) {
          const credential = EmailAuthProvider.credential(
            userData.email || '',
            uuidv4()
          );
          await linkWithCredential(auth.currentUser, credential);
        }

        setUser(userData);
      }
    } else if (providerName === 'password' && email && password) {
      const signIn = await signInWithEmailAndPassword(auth, email, password);

      if (signIn.user) {
        const userData = {
          id: signIn.user.uid,
          name: signIn.user.displayName || 'Nome não forncecido',
          email: signIn.user.email || 'Email não fornecido',
          avatarUrl: signIn.user.photoURL || 'Foto não fornceda',
        };

        setUser(userData);
      }
    }
  };

  const SignOut = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};