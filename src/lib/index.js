import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider } from 'firebase/auth'
import {auth} from "./firebase.js"





export const signUpUser = (email2, password2, passwordRepet) => 
  createUserWithEmailAndPassword(auth,email2,password2, passwordRepet);
   

export const loginUser = (email, password) => {
    console.log(email, password)
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider;
  return signInWithPopup(auth,provider)
}
