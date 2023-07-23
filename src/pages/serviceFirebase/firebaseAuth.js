import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut,
} from 'firebase/auth';
import {
  setDoc, doc, collection, addDoc, query, getDocs,
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

const deslogar = async () => {
  await signOut(auth);
};

const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// essa função nos permite ler o banco de dados
// Fizemos com a Nury
const fetchData = async () => {
  const q = query(collection(db, 'Post'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(docs.id, '=>', docs.data());
  });
};

fetchData();

const auth1 = getAuth();

// Função para obter o usuário atual autenticado
const getCurrentUser = () => new Promise((resolve, reject) => {
  const unsubscribe = onAuthStateChanged(auth1, (user) => {
    unsubscribe();
    resolve(user);
  }, reject);
});

const criarPost = async (mensagem) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      console.log('Usuário não autenticado');
      return;
    }

    // Dados do novo post que você deseja criar
    const novoPost = {
      mensagem,
      user_id: user.uid, // Use user.uid para obter o ID do usuário
      likes: 0,
    };

    await addDoc(collection(db, 'Post'), novoPost);
  } catch (error) {
    console.error('Erro ao criar o post:', error);
  }
};

export {
  createUser, login, addonAuthStateChanged, loginGoogle, createUserWithEmailAndPassword, criarPost,
  deslogar, fetchData,
};
// export const googleLogin = () => {
//   const provider = new GoogleAuthProvider();
//   return signInWithPopup(Auth, provider);
// };

// export const logOut = () => signOut(Auth);
