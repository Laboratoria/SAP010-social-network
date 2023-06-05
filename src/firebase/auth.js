import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';

import { app } from './app.js';

export const getAppAuth = () => getAuth(app);

export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

export const createUserWithEmail = (name, email, password) => {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: `${name}`,
      });
    });
};

export const loginWithEmail = (email, password) => {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};
