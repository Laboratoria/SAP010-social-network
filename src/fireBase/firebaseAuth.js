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
export const createUser = (email, senha, nome, sobrenome, displayName) =>
  createUserWithEmailAndPassword(auth, email, senha).then(userCredential => {
    // Signed in
    const user = userCredential.user; // aqui atualizar o perfil do usuario
    return updateProfile(user, { nome, sobrenome, displayName });
  });
//criar um catch

export const signIn = (email, password) =>
signInWithEmailAndPassword(auth, email, password);


export const signInGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}
export const logOut = () => signOut(auth);
