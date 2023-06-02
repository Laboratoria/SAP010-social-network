import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
     } from 'firebase/auth';
  import { app } from './app.js';
  
  export const getAppAuth = () => getAuth(app);
  
  export const getUserId = () => {
    const auth = getAppAuth();
    return auth.currentUser.uid;
  };
  
  export const createUserWithEmail = (name, email, password) => {
    const auth = getAppAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      });
  };
  
  
  export const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAppAuth();
    return signInWithPopup(auth, provider);
  };
  