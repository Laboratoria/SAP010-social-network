import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

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