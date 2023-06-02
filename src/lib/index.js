import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';

/* import { getUsers, collection, getDocs } from 'firebase/firestore'; */

import { auth } from './firebase.js';

// CRIAR USUÁRIO
export const loginCreate = () => {
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // o "then" tem acesso a informações relacionadas ao login bem-sucedido
    const user = userCredential.user; // Contém as informações do usuário logado.
  }).catch((error) => { // trata os erros que possam ocorrer durante a autenticação
    const errorCode = error.code; // Representa o código de erro específico.
    const errorMessage = error.message; // Contém a mensagem de erro associada.
  });
};

// LOGAR COM USUÁRIO EXISTENTE
export const loginUser = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
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