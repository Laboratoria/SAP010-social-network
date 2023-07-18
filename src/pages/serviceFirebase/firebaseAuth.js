import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import {
  setDoc, doc, collection, query, getDocs,
} from 'firebase/firestore';
import { app, db } from '../../firebaseInit.config.js';

// GoogleAuthProvider,  signInWithPopup, updateProfile,  signOut,
// createUserWithEmailAndPassword, import { app } from "../firebaseInit.js";

export const auth = getAuth(app);

// cadastro de usuarios novos

const createUser = async (nome, email, senha) => {
  await createUserWithEmailAndPassword(auth, email, senha);
  await setDoc(doc(db, 'User', email), {
    nome,
    email,
  });
};

// comentei esta parte porque aindo não iremos usar
// .then((userCredential) => {
//   // Signed in
//   const user = userCredential.user; // aqui atualizar o perfil do usuario
//   return updateProfile(user, { nome });
// });

const login = (email, senha) => signInWithEmailAndPassword(auth, email, senha);
const addonAuthStateChanged = (callback) => onAuthStateChanged(auth, callback);

const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
// const provider = new GoogleAuthProvider() => signInWithPopup(auth, provider);

// essa função nos permite ler o banco de dados que fizemos direto no firebase
// Fizemos com a Nury
const fetchData = async () => {
  const q = query(collection(db, 'POst'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(docs.id, '=>', docs.data());
  });
};

fetchData();

// const criarPost = async(mensagemPost, user) => {
//   const uid =
// };

export {
  createUser, login, addonAuthStateChanged, loginGoogle, createUserWithEmailAndPassword,
};
// export const googleLogin = () => {
//   const provider = new GoogleAuthProvider();
//   return signInWithPopup(Auth, provider);
// };

// export const logOut = () => signOut(Auth);
