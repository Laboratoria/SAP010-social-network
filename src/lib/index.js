import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';

import { auth } from '../Firebase/instalfirebase';

// função para fazer login do usuario
export const authLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

// função para login da conta do google
const authProvedor = new GoogleAuthProvider();
export const authLoginGoogle = () => signInWithPopup(auth, authProvedor);

export const newUser = async (email, senha, displayName) => {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, { displayName });
};

const provider = new FacebookAuthProvider();
export const authLoginFacebook = () => signInWithPopup(auth, provider);
