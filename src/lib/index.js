import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { app } from '../firebase/firebase.js';

export const auth = getAuth(app);

export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
