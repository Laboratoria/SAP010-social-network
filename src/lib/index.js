// aqui exportaras las funciones que necesites

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';

/*import { getUsers, collection, getDocs } from 'firebase/firestore';*/

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
  .then((userCredential) => { // o "then" tem acesso a informações relacionadas ao login bem-sucedido
    const user = userCredential.user; // Contém as informações do usuário logado.
  })
  .catch((error) => { // trata os erros que possam ocorrer durante a autenticação
    const errorCode = error.code; // Representa o código de erro específico.
    const errorMessage = error.message; // Contém a mensagem de erro associada.
  });
};

// LOGAR COM CONTA GOOGLE
export const loginGoogle = () => {
  const auth = getAuth(); // realiza a autenticação do usuário.
  const provider = new GoogleAuthProvider(); // indicando que a autenticação será realizada usando a conta do Google

signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result); // Fornece um token de acesso do Google, que pode ser usado para acessar as APIs do Google.
    const token = credential.accessToken; // Representa o token de acesso do Google.
    const user = result.user; // Contém as informações do usuário logado.
  }).catch((error) => { // trata os erros que possam ocorrer durante a autenticação
    const errorCode = error.code; // Representa o código de erro específico.
    const errorMessage = error.message; // Contém a mensagem de erro associada.
    const email = error.customData.email; // Armazena o endereço de e-mail da conta do usuário utilizado.
    const credential = GoogleAuthProvider.credentialFromError(error); // Fornece informações adicionais sobre o tipo de credencial usado na autenticação.
  });
};