import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { app } from '../../firebaseInit.config.js';
// GoogleAuthProvider,  signInWithPopup, updateProfile,  signOut,
// createUserWithEmailAndPassword, import { app } from "../firebaseInit.js";

export const Auth = getAuth(app);

// cadastro de usuarios novos

const createUser = (nome, email, senha) => createUserWithEmailAndPassword(Auth, email, senha);
// comentei esta parte porque aindo não iremos usar
// .then((userCredential) => {
//   // Signed in
//   const user = userCredential.user; // aqui atualizar o perfil do usuario
//   return updateProfile(user, { nome });
// });

const login = (email, senha) => signInWithEmailAndPassword(Auth, email, senha);
const addonAuthStateChanged = (callback) => onAuthStateChanged(Auth, callback);

const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(Auth, provider);
};
// const provider = new GoogleAuthProvider() => signInWithPopup(auth, provider);

export {
  createUser, login, addonAuthStateChanged, loginGoogle, createUserWithEmailAndPassword,
};
// export const googleLogin = () => {
//   const provider = new GoogleAuthProvider();
//   return signInWithPopup(Auth, provider);
// };

// export const logOut = () => signOut(Auth);
