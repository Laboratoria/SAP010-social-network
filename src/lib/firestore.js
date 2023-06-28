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
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';

import { db } from '../firebase/firebase';

import { auth } from './index.js';

//  função de criar um post no banco de dados

export const criarPost = async (dadosPost) => {
  await addDoc(collection(db, 'post'), dadosPost);
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

// primeiro verifica o provedor de login, depois recupera e retorna o username
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

// deleta a postagem
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

// checa se o ID do usuário atual é igual ao id do autor da postagem
export const checkAuthor = async (postId) => {
  const currentUserId = await getCurrentUserId();
  const postRef = doc(db, 'post', postId);
  const docSnapshot = await getDoc(postRef);

  if (
    docSnapshot.exists() &&
    docSnapshot.data().postAuthorId === currentUserId
  ) {
    return true;
  } else {
    return false;
  }
};

// edita o doc da collection 'post'

export const editPostDoc = async (
  postId,
  racaEdit,
  mensagemEdit,
  localizacaoEdit,
  idadeEdit,
  sexoEdit,
  especieEdit,
  opcaoAdocaoEdit,
  contatoEdit
) => {
  const postRef = doc(db, 'post', postId);

  await updateDoc(postRef, {
    raca: racaEdit,
    mensagem: mensagemEdit,
    localizacao: localizacaoEdit,
    idadePet: idadeEdit,
    especie: especieEdit,
    opcaoAdocao: opcaoAdocaoEdit,
    contato: contatoEdit,
    sexo: sexoEdit,
  });

  console.log('documento editado');
};

export const addLike = async (postId, newLike) => {
  const postRef = doc(db, 'post', postId);

  const postSnapshot = await getDoc(postRef);
  if (postSnapshot.exists()) {
    const postData = postSnapshot.data();
    const postLikes = postData.postLikes;
    const hasLiked = postLikes.includes(newLike);

    if (hasLiked) {
      const updatedLikes = postLikes.filter(like => like !== newLike);
      await updateDoc(postRef, {
        postLikes: updatedLikes,
      });
      console.log('Like removido');
    } else {
      await updateDoc(postRef, {
        postLikes: arrayUnion(newLike),
      });
      console.log('Like adicionado');
    }
  }

  const updatedSnapshot = await getDoc(postRef);
  if (updatedSnapshot.exists()) {
    const updatedData = updatedSnapshot.data();
    const updatedLikes = updatedData.postLikes;
    const likesCount = updatedLikes.length-1;
    return likesCount;
  }
};
