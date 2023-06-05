import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';

/* import { getUsers, collection, getDocs } from 'firebase/firestore'; */

import { auth } from './firebase.js';

// CRIAR USUÁRIO
export const loginCreate = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// LOGAR COM USUÁRIO EXISTENTE
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
};

// LOGAR COM CONTA GOOGLE
export const loginGoogle = () => {
  const auth = getAuth(); // realiza a autenticação do usuário.
  const provider = new GoogleAuthProvider();
  // indicando que a autenticação será realizada usando a conta do Google

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result); 
      // Fornece um token de acesso do Google, que pode ser usado para acessar as APIs do Google.
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};