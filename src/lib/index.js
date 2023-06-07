import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from "../firebase/firebase.js"

export const auth = getAuth(app);

const signUpForm = document.getElementById("signup-form");


export const signUpUser = (email, password) => {
  
  createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Usuário registrado com sucesso");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("mensagem de erro");
    });
};

