import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './index.js';


//função de criar um post no banco de dados

export const criarPost = async (dadosPost) => {
  try {
    const docRef = await addDoc(collection(db, 'post'), dadosPost);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

//função de carregar os dados das postagens do banco de dados em ordem de data

export const carregarPosts = async () => {
  const q = query(collection(db, 'post'), orderBy('dataAtual', 'desc'));
  const querySnapshot = await getDocs(q);
  const arrayPosts = [];
  querySnapshot.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    arrayPosts.push(data);
    console.log(post.id, ' => ', post.data());
  });

  return arrayPosts;
};

export const createUserData = async (nome) => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;

      const docRef = await addDoc(collection(db, 'usernames'), {
        name: nome,
        userId: userId
      });
    }
  });
}


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error('Usuário não autenticado'));
      }
    });
  });
};





export const getUsername = async () => {
  try {
    const currentUserId = await getCurrentUser();
    const q = query(collection(db, 'usernames'), where('userId', '==', currentUserId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const username = doc.data().name;
      return username; // Retorna o nome de usuário
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/*  export const getUsername = async (userId) => {
  const userDoc = await getDoc(collection(db, 'usernames', userId));
    const username = userDoc.data().name; // Obtém o nome de usuário do documento do usuário
  console.log('username')
} */