// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw4SzPyWd6RTvvNqguANWBromr-XyNc5E",
  authDomain: "mulheres-viajantes-5253f.firebaseapp.com",
  projectId: "mulheres-viajantes-5253f",
  storageBucket: "mulheres-viajantes-5253f.appspot.com",
  messagingSenderId: "267227895129",
  appId: "1:267227895129:web:08126e7de8a05a6b30a848"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "abacate@frutas.com";
const password = "123456";
createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Deu certo!!")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Deu errado!!")
    // ..
  });

myFunction();
