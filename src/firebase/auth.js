import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from './app.js';

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
  return 'viajante';
};

export const createUserDocument = (user) => {
  const { uid, displayName, email } = user;
  const userRef = doc(db, 'users', uid);
  const userData = {
    displayName,
    email,
  };
  return setDoc(userRef, userData);
};

export const createUserWithEmail = (name, lastName, email, password) => {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, {
        displayName: `${name} ${lastName}`,
      }).then(() => createUserDocument(user));
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
  return signInWithPopup(auth, provider).then((userCredential) => {
    const user = userCredential.user;
    return createUserDocument(user);
  });
};

export const loginFacebook = () => {
  const provider = new FacebookAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider).then((userCredential) => {
    const user = userCredential.user;
    return createUserDocument(user);
  });
};

export const logOut = () => {
  const auth = getAppAuth();
  return signOut(auth);
};

export const checkLoggedUser = (check) => {
  const auth = getAppAuth();
  return onAuthStateChanged(auth, check);
};
