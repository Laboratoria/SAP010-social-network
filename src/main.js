// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
myFunction();
import {auth, app, db } from './firebaseConfig.js';

import { createUserWithEmailAndPassword } from "firebase/auth";

const buttonEnter = document.getElementById('button-enter')
const inputEmail = document.getElementById('input-email')
const inputPassword = document.getElementById('input-password')

buttonEnter.addEventListener("click", (event) => {
  const email = inputEmail.value
  const password = inputPassword.value
  console.log("email:"+email+" senha:"+password)

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    });

})