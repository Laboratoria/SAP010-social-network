// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
//   console.log('Hola mundo!');
// };

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app, auth } from "./firebase-config.js";

export function cadastrarUsuario(email, senha) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, senha);

}

export function loginUsuario(email, senha) {

    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, senha);

}

export function redefinirSenha(email) {

    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);

}