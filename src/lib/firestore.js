import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';

import { db } from '../firebase/firebase';

import { auth } from './index.js';

//  função de criar um post no banco de dados

export const criarPost = async (dadosPost) => {
  try {
    const docRef = await addDoc(collection(db, 'post'), dadosPost);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

//  função de carregar os dados das postagens do banco de dados em ordem de data

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

//  Adcionar nome e ID à coleção 'usernames'
export const createUserData = async (nome) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      await addDoc(collection(db, 'usernames'), {
        name: nome,
        userId,
      });
    }
  });
};

// recupera o Id do usuário atual
export const getCurrentUserId = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error('Usuário não autenticado'));
      }
    });
  });

// recupera todas as informações do usuário atual
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Usuário não autenticado'));
      }
    });
  });
}

// primeiro verifica o provedor de login, depois recupera o username
export const getUsername = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      const providerData = await currentUser.providerData;

      if (
        providerData.some((provider) => provider.providerId === 'google.com')
      ) {
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
      const currentDoc = querySnapshot.docs[0];
      const username = currentDoc.data().name;
      return username;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deletePost = (id) =>
  new Promise((resolve, reject) => {
    try {
      deleteDoc(doc(db, 'post', id));
      console.log('Document deleted with ID: ', id);
      resolve();
    } catch (e) {
      console.error('Error deleting document: ', e);
      reject(e);
    }
  });

export const checkAuthor = async (postId) => {
  const currentUserId = await getCurrentUserId();
  const postRef = doc(db, 'post', postId);
  const docSnapshot = await getDoc(postRef);

  if (docSnapshot.exists() && docSnapshot.data().postAuthorId === currentUserId) {
    return true;
  } else {
    return false;
  }
};
