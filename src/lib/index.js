import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';

/* import { getUsers, collection, getDocs } from 'firebase/firestore'; */

import { auth } from './firebase.js';

// CRIAR USUÁRIO
export const loginCreate = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password);
};

// LOGAR COM USUÁRIO EXISTENTE
export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};

// LOGAR COM CONTA GOOGLE
export const loginGoogle = () => {
  const authInstance = getAuth();
  const provider = new GoogleAuthProvider();

  return signInWithPopup(authInstance, provider);
};
