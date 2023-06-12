import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {app} from "../firebase/firebase.js"

export const auth = getAuth(app);




export const signUpUser = (email, password) => {
  
  createUserWithEmailAndPassword(auth,email,password)
   
}

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}
