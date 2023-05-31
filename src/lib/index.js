// aqui exportaras las funciones que necesites

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';

import { } from 'firebase/firestore';

import { } from './firebase.js';

//CRIAR USUÁRIO
const authCreate = getAuth();
createUserWithEmailAndPassword(authCreate, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

//LOGAR COM USUÁRIO EXISTENTE
const authLogin = getAuth();
signInWithEmailAndPassword(authLogin, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

//LOGAR COM CONTA GOOGLE
const provider = new GoogleAuthProvider();

const authGoogle = getAuth();
signInWithPopup(authGoogle, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
