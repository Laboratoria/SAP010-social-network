import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
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
export const newUser = async (email, senha) => {
  await createUserWithEmailAndPassword(auth, email, senha);
  // await updateProfile(auth.currentUser, { displayName });
};

const provider = new FacebookAuthProvider();
export const authLoginFacebook = () => signInWithPopup(auth, provider);

export const logout = async () => {
  await signOut(auth);
  window.location.hash = '';
};
