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
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'


import { onAuthStateChanged } from 'firebase/auth';

import { app, db } from '../firebase/firebase';

import { getStorage } from 'firebase/storage';

import { auth } from './index.js';

//  função de criar um post no banco de dados

export const createPost = async (dadosPost) => {
  await addDoc(collection(db, 'post'), dadosPost);
};

//  função de carregar os dados das postagens do banco de dados em ordem de data

export const loadPosts = async () => {
  const querySnapshot = await getDocs(query(collection(db, 'post'), orderBy('dataAtual', 'desc')));
  return querySnapshot.docs.map((post) => {
    const data = post.data();
    return { ...data, id: post.id };
  });
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

export const getCurrentUserId = () => (
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        reject(new Error('Usuário não autenticado.'));
      }
    });
  })
);

// recupera todas as informações do usuário atual
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Usuário não autenticado.'));
      }
    });
  });
}

// primeiro verifica o provedor de login, depois recupera e retorna o username
export const getUsername = async (currentUser, currentUserId) => {
  if (currentUser) {
    const providerData = await currentUser.providerData;

    if (providerData.some((provider) => provider.providerId === 'google.com')) {
      const username = currentUser.displayName;
      return username;
    }
    const q = query(
      collection(db, 'usernames'),
      where('userId', '==', currentUserId),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const currentDoc = querySnapshot.docs[0];
      const username = currentDoc.data().name;
      return username;
    }
  }
  return null;
};

// deleta a postagem

export const deletePost = (id) => (
  new Promise((resolve) => {
    deleteDoc(doc(db, 'post', id));
    resolve();
  })
);

// checa se o ID do usuário atual é igual ao id do autor da postagem
export const checkAuthor = async (postId, currentUserId) => {
  const postRef = doc(db, 'post', postId);
  const docSnapshot = await getDoc(postRef);

  return (
    docSnapshot.exists() && docSnapshot.data().postAuthorId === currentUserId
  );
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
  contatoEdit,
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
};

export const addLike = async (postId, newLike) => {
  const postRef = doc(db, 'post', postId);

  const postSnapshot = await getDoc(postRef);
  if (postSnapshot.exists) { // Correção: verifica a propriedade exists
    const postData = postSnapshot.data();
    const postLikes = postData.postLikes;
    const hasLiked = postLikes.includes(newLike);

    if (hasLiked) {
      const updatedLikes = postLikes.filter((like) => like !== newLike);
      await updateDoc(postRef, {
        postLikes: updatedLikes,
      });
    } else {
      await updateDoc(postRef, {
        postLikes: arrayUnion(newLike),
      });
    }
  }
};

export const numberOfLikes = async (postId) => {
  const postRef = doc(db, 'post', postId);
  const updatedSnapshot = await getDoc(postRef);
  if (updatedSnapshot.exists()) {
    const updatedData = updatedSnapshot.data();
    const updatedLikes = updatedData.postLikes;
    const likesCount = updatedLikes.length;
    return likesCount;
  }
  return console.log('não encontrado');
};

const storage = getStorage(app);

export const uploadPhoto = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};