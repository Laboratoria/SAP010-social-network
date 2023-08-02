import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection, addDoc, query, getDocs, orderBy, deleteDoc, doc,
  updateDoc,
} from 'firebase/firestore';
import { app, db } from '../../firebaseInit.config.js';

export const auth = getAuth(app);

const criarUsuario = async (email, senha) => {
  await createUserWithEmailAndPassword(auth, email, senha);
};

const atualizaPerfil = (nome) => updateProfile(auth.currentUser, { // testar
  displayName: nome,
});

const login = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

const deslogar = async () => {
  await signOut(auth);
};

const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const fetchData = async () => { // testar
  const q = query(collection(db, 'Post'), orderBy('data', 'desc'));
  const querySnapshot = await getDocs(q);
  console.log('querySnapshot:', querySnapshot);
  const posts = []; // Array para armazenar os dados das postagens

  querySnapshot.forEach((docs) => {
    const postData = docs.data();
    postData.id = docs.id; // Definir o ID do documento como a propriedade "id"
    posts.push(postData); // Adiciona cada postagem no array de posts
  });

  return posts; // Retorna o array com os dados das postagens
};

const auth1 = getAuth();

// Função para obter o usuário atual autenticado
const usuarioAtual = () => new Promise((resolve, reject) => { // testar Diuli
  const unsubscribe = onAuthStateChanged(auth1, (user) => {
    unsubscribe();
    resolve(user);
    return !!user;// Retorna true se o usuário estiver logado, caso contrário, retorna false
  }, reject);
});

const criarPost = async (mensagem) => { // testar Diuli
  try {
    const user = await usuarioAtual();
    if (!user) {
      console.log('Usuário não autenticado');
      return;
    }

    const novoPost = {
      mensagem,
      user_id: user.uid,
      nome: user.displayName,
      data: new Date(),
    };

    await addDoc(collection(db, 'Post'), novoPost);
  } catch (error) {
    console.error('Erro ao criar o post:', error);
  }
};

const deletarPost = async (postId) => { // testar
  const docRef = doc(db, 'Post', postId);
  console.log('este é o ', postId);
  await deleteDoc(docRef);
};

const editarPost = async (postId, novaMensagem) => {
  const refDoc = doc(db, 'Post', postId);
  await updateDoc(refDoc, {
    mensagem: novaMensagem,
  });
};

const manipularMudancaHash = async () => { // testar
  const estaLogado = await usuarioAtual();
  const novaHash = window.location.hash;

  if (!estaLogado && novaHash !== '#login') {
    // Se o usuário não estiver logado e a nova hash não for "#login",
    // redireciona para a página de login
    window.location.hash = '#login';
  }
};

export {
  criarUsuario, login,
  loginGoogle, createUserWithEmailAndPassword, criarPost,
  deslogar, fetchData, usuarioAtual, atualizaPerfil, manipularMudancaHash, deletarPost,
  editarPost,
};
