import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './firebaseConfig.js';

// cadastro de usuarios novos
export const createUser = (email, password, name, lastName, username) =>
  createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
    // Depois que criou o usuário executa a função baixo
    const user = userCredential.user; // atualiza o perfil do usuário
    return updateProfile(user, { name, lastName, username });
  });
//criar um catch?

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);
