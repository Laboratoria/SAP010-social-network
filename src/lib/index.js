import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from "../firebase/firebase.js"

export const auth = getAuth(app);

const signUpUser = (email, password) => {
  
  createUserWithEmailAndPassword(auth,email,password)
   
}

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}
