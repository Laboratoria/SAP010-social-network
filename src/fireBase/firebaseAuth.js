import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

// cadastro de usuarios novos
export const createUser = (email, senha, nome, sobrenome, displayName) =>
  createUserWithEmailAndPassword(auth, email, senha).then(userCredential => {
    // Signed in
    const user = userCredential.user; // aqui atualizar o perfil do usuario
    return updateProfile(user, { nome, sobrenome, displayName });
  });

//export const login = (email, senha) =>
//signInWithEmailAndPassword(Auth, email, senha);

//export const googleLogin = () => {
//  const provider = new GoogleAuthProvider();
//  return signInWithPopup(Auth, provider);
//};

export const logOut = () => signOut(auth);
