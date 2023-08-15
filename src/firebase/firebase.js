import { myFunction } from './lib/index.js';
// Este es el punto de entrada de tu aplicacion

// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
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
