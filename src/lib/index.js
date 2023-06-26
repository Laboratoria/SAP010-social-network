import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from '../Firebase/instalfirebase';
import { routes } from '../main';

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log({ user });
    window.localStorage.setItem('token', 'aaa');
  } else {
    window.localStorage.removeItem('token');
  }

  routes();
});

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
