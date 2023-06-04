// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
myFunction();
import {auth, app, db } from './firebaseConfig.js';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

const buttonLogin = document.getElementById('button-login')
const buttonNewAccount = document.getElementById('button-new-account')
const buttonLoginGoogle = document.getElementById('button-login-google')
const inputEmail = document.getElementById('input-email')
const inputPassword = document.getElementById('input-password')

buttonLogin.addEventListener("click", (event) => {
  const email = inputEmail.value
  const password = inputPassword.value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // O login foi realizado com sucesso
      const user = userCredential.user;
      console.log(user);
      // Redirecione para a página principal ou execute outra ação necessária
    })
    .catch((error) => {
      // Ocorreu um erro durante o login
      console.error(error);
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

// Após link de redirecionamento para criar nova conta, implementar botão para utilizar essa função.
buttonNewAccount.addEventListener("click", (event) => {
  const email = inputEmail.value
  const password = inputPassword.value
  console.log("email:"+email+" senha:"+password)

  createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    // Signed
    const user = userCredential.user;
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    });
})