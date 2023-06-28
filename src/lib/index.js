import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
 } from 'firebase/auth'
import {auth, app} from "./firebase.js"
import { getAuth, updateProfile} from 'firebase/auth';



export const signUpUser = (name, email2, password2 ) => {
  const authAccount = getAuth(app);
  createUserWithEmailAndPassword(auth, email2,password2, );

  return updateProfile(authAccount.currentUser, {
    displayName: name,
  }
)};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider;
  return signInWithPopup(auth,provider)
}

export const logout = () => signOut (auth);