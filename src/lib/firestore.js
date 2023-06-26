import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
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
        userId: userId,
      });
    }
  });
};

const getCurrentUserId = () => {
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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Usuário não autenticado'));
      }
    });
  });
};

export const getUsername = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      const providerData = await currentUser.providerData;

      if (providerData.some((provider) => provider.providerId === 'google.com')) {
        const username = currentUser.displayName;
        return username;
      }
    }

    const currentUserId = await getCurrentUserId();
    const q = query(
      collection(db, 'usernames'),
      where('userId', '==', currentUserId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const username = doc.data().name;
      return username;
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

export const deletePost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, "post", id));
      console.log('Document deleted with ID: ', id);
      resolve();
    } catch (e) {
      console.error('Error deleting document: ', e);
      reject(e);
    }
  });

};