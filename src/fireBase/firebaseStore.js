import { 
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { db } from './firebaseConfig';

const collectionInfosAdd = 'infos-add'
const collectionPosts = 'posts'

export const userData = (
  nameElement,
  lastnameElement,
  emailElement,
  userElement
) =>
  addDoc(collection(db, collectionInfosAdd), {
    name: nameElement,
    lastname: lastnameElement,
    email: emailElement,
    username: userElement,
  });

//aqui virá as funções de postagem, para ficarem guardadas

export const createPost = (
  date,
  username,
  text,
  uid
) =>
  addDoc(collection(db, collectionPosts), {
    date: date,
    username: username,
    // array de likes vai guardar os displayName de todos os usuarios que curtiram uma publicação
    likes: [],
    text: text,
    uid: uid
  });

export const fetchPosts = async () => {
  // pega a coleção de posts do firebase
  const postsCollection = collection(db, collectionPosts);
  // pega todos os documentos dentro da coleção de posts
  const snapshot = await getDocs(postsCollection);
  const posts = [];

  snapshot.forEach((doc) => {
    // cria um objeto post para cada dado dentro do documento (ultima aba da direita)
    const post = doc.data();
    // o post vai ter todos os campos da coleção (date, likes, text, uid, username)
    // mas tb vamos precisar do id do doc para editar ou deletar
    // pois o id é a unica referencia que é unica de cada doc
    // vamos salvar em um campo do post para, no feed, poder saber qual documento queremos alterar
    post.id = doc.id;
    posts.push(post);
  });

  return posts;
}

export const likeCounter = async (
  postId,
  username
) =>
  updateDoc(doc(db, collectionPosts, postId), {
    likes: arrayUnion(username)
  });

export const deslikeCounter = async (
  postId,
  username
) =>
  updateDoc(doc(db, collectionPosts, postId), {
    likes: arrayRemove(username)
  });