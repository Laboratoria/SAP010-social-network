import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { auth } from '../Firebase/instalfirebase';

export const authStateChanged = (callback) => {
  onAuthStateChanged(auth, callback);
};

// função para fazer login do usuario
export const authLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

// função para login da conta do google
const authProvedor = new GoogleAuthProvider();
export const authLoginGoogle = () => signInWithPopup(auth, authProvedor);

// incluir displayName nos parametros se for usar futuramente
export const newUser = async (email, senha, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(userCredential.user, { displayName });
};

// função para logout do site
export const logout = async () => {
  await signOut(auth);
};
