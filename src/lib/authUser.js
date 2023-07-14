// verificação de senha
// verificação de erro (catch e erros para fazer validação)

import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile,
} from 'firebase/auth';
import { app } from './configfirebase.js';

export const getAppAuth = () => getAuth(app);
// Criar Usuário
export function cadastroUsuarioSenha(usuario, email, senha) {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, senha)
    .then(
      (userCredential) => {
        const user = userCredential.user;
        window.location.hash = '#feed';
        updateProfile(user, {
          displayName: `${usuario}`,
        });
      },
    );
  // verificar quais parametros vão ser vinculados ao feed via firebase
}

// Login
export function loginEmail(email, senha) {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, senha);
}

// login google

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};

/* export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return null;
}; */

// id do usuario no firebase
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};
