import { 
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';

import { db } from './firebaseConfig';

export const userData = (
  nameElement,
  lastnameElement,
  emailElement,
  userElement
) =>
  addDoc(collection(db, 'infos-add'), {
    name: nameElement,
    lastname: lastnameElement,
    email: emailElement,
    username: userElement,
  });

//aqui virá as funções de postagem, para ficarem guardadas

export const createFeedData = (
  dateElement,
  nameElement,
  likeElement,
  textElement
) =>
  addDoc(collection(db, 'posts'), {
    data: dateElement,
    nome: nameElement,
    like: likeElement,
    texto: textElement,
  });

export const fetchPosts = async () => {
  const postsCollection = collection(db, 'posts');
  const snapshot = await getDocs(postsCollection);
  const posts = [];

  snapshot.forEach((doc) => {
    const post = doc.data();
    posts.push(post);
  });

  return posts;
}