import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {app} from "../firebase/firebase.js"

export const auth = getAuth(app);

export const signUpUser = (email, password) => {
  
  return createUserWithEmailAndPassword(auth,email,password)
   
}

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
  
  
}

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)

  
}