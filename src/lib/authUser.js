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
export function userLogout() {
  const authLogOut = getAuth();
  return signOut(authLogOut);
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
  if (user.displayName != null || user.displayName != undefined || user.displayName != '') {
    return user.displayName;
    //return user.photoURL;
  }
  return "Anônimo";  //o usuário autentica e entra, se ele não autentica, mostra mensagem de erro. 
  //Então não entendi pq essa condição de retornar anonimo?
};
// id do usuario no firebase
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

//não entendi de onde vem o auth.currentUser