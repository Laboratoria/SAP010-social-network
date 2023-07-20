import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut,
  onAuthStateChanged } from 'firebase/auth';
import { app } from './configfirebase.js';

export const getAppAuth = () => getAuth(app);
// Criar Usuário
export function cadastroUsuarioSenha(email, senha) {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, senha);    
}
// Login
export function loginEmail(email, senha) {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, senha);
}
// login google
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};
// deslogar
export async function userLogout() {
  const authLogOut = getAuth();
  await signOut(authLogOut);
}
//verifica se esta logado
export function userAuthCheck(callback) {
  const authLogin = getAuth(app);
  return onAuthStateChanged(authLogin, callback);
}
// retorno do usuario autenticado
export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return null;
};
// id do usuario no firebase
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};
