import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './firebaseConfig.js';

export const currentUser = auth.currentUser

// cadastro de usuarios novos
export const createUser = (email, password, displayName) =>
  createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
    // Depois que criou o usuário executa a função baixo
    const user = userCredential.user; // atualiza o perfil do usuário
    return updateProfile(user, { displayName });
  });
//criar um catch?

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);
