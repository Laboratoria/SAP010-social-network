// auth.js será para exportar funções relacionadas a autenticação

// getAppAuth- retorno da autenticação do firebase
// getUserId - retorno do id do usuario

import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { app } from './configFirebase.js';

// login google
export const getAppAuth = () => getAuth(app);

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};

// criar usuario
export const createUserWithEmail = (name, email, senha) => {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, senha).then(
    (userCredential) => {
      const user = userCredential.user;
      window.location.hash = '#feed';
      return updateProfile(user, {
        displayName: `${name} ${lastName}`,
      });
    },
  );
};

// login
export const loginWithEmail = (email, password) => {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

// id do usuario no firebase
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

// retorno do usuario autenticado caso exista
export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return null;
};