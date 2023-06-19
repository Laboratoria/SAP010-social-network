import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  FacebookAuthProvider,
} from 'firebase/auth';

import { app } from './app.js';

export const getAppAuth = () => getAuth(app);

export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return '';
};

export const createUserWithEmail = (name, lastName, email, password) => {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: `${name} ${lastName}`,
      });
    },
  );
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

export const loginFacebook = () => {
  const provider = new FacebookAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};
