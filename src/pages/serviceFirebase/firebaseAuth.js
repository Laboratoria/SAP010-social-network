import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection, addDoc, query, getDocs,
} from 'firebase/firestore';
import { app, db } from '../../firebaseInit.config.js';

export const auth = getAuth(app);

const createUser = async (email, senha) => {
  await createUserWithEmailAndPassword(auth, email, senha);
};

const atualizaPerfil = (nome) => updateProfile(auth.currentUser, {
  displayName: nome,
});

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
  const posts = [];
  const q = query(collection(db, 'Post'));
  const snapshot = await getDocs(q);
  snapshot.forEach((document) => {
    posts.push({ ...document.data(), docRef: document.id });
  });
  return posts;
};

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
      nome: user.displayName,
    };

    await addDoc(collection(db, 'Post'), novoPost);
  } catch (error) {
    console.error('Erro ao criar o post:', error);
  }
};

export {
  createUser, login, addonAuthStateChanged, loginGoogle, createUserWithEmailAndPassword, criarPost,
  deslogar, fetchData, getCurrentUser, atualizaPerfil,
};
