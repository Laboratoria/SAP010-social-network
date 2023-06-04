// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
myFunction();
import {auth, app, db } from './firebaseConfig.js';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const buttonEnter = document.getElementById('button-enter')
const buttonLoginGoogle = document.getElementById('button-login-google')
const inputEmail = document.getElementById('input-email')
const inputPassword = document.getElementById('input-password')

buttonEnter.addEventListener("click", (event) => {
  const email = inputEmail.value
  const password = inputPassword.value
  console.log("email:"+email+" senha:"+password)

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed
    const user = userCredential.user;
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    });

})

const provider = new GoogleAuthProvider();

buttonLoginGoogle.addEventListener("click", (event) => {
  signInWithPopup(auth, provider)

  .then((result) => {
    // O login com o Google foi bem-sucedido, você pode acessar as informações do usuário através de result.user
    const user = result.user;
  })
  .catch((error) => {
    // Ocorreu um erro durante o login com o Google
    const errorCode = error.code;
    const errorMessage = error.message;
  });


})
