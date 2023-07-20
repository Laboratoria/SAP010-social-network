// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
//   console.log('Hola mundo!');
// };
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase-config.js';

export function cadastrarUsuario(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

export function loginUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

export function redefinirSenha(email) {
  return sendPasswordResetEmail(auth, email);
}
