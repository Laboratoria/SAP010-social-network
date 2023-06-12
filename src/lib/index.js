import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider } from 'firebase/auth'
import {auth} from "../firebase.js"





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

export const loginUser = (email, password) => {
    console.log(email, password)
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider;
  return signInWithPopup(auth,provider)
}
