/* eslint-disable no-console */
/* eslint-disable indent */
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app } from '../../firebaseInit.config.js';
// GoogleAuthProvider,  signInWithPopup,  signOut,
// createUserWithEmailAndPassword, import { app } from "../firebaseInit.js";

export const Auth = getAuth(app);

// cadastro de usuarios novos

 const createUser = (email, senha, nome, sobrenome, displayName) => {
  createUserWithEmailAndPassword(Auth, email, senha)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user; // aqui atualizar o perfil do usuario
    return updateProfile(user, { nome, sobrenome, displayName });
    // ...
  });
};
 const login = (email, senha) => {
  signInWithEmailAndPassword(Auth, email, senha);
 };

export { createUser, login };
// export const googleLogin = () => {
//   const provider = new GoogleAuthProvider();
//   return signInWithPopup(Auth, provider);
// };

// export const logOut = () => signOut(Auth);
