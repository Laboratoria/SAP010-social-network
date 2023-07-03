import {
  collection,
  doc,
  query,
  addDoc,
  setDoc,
  orderBy,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../Firebase/instalfirebase';

// função que atualiza a página do feed
const updateUI = (render, feedItems, likes) => {
  // aqui eu vou transformar minha lista de postagens adicionando os likes de cada postagem
  const items = feedItems.map((item) => ({
    // esses 3 pontinhos são chamados de spread, servem para copiar
    // todas as propriedades de um objeto
    ...item,
    // aqui eu crio uma nova propriedade chamada likes que recebe uma
    // lista com todas as pessoas que deram like na postagem
    likes: likes.filter(({ postId }) => postId === item.id),
  }));

  // e então eu chamo essa função render que veio de parametro, para
  // atualizar o html com a minha nova lista de items, com os likes
  render(items);
};

export const getFeedItems = (renderItems) => {
  // criadas essas duas novas variaveis, para guardar os posts e feeds para usar depois
  let feedItems = [];
  let likes = [];

  const feedPost = collection(db, 'Post');
  const q = query(feedPost, orderBy('createdAt', 'desc'));
  onSnapshot(q, (querySnapshot) => {
    // limpa a variavel de posts para adicionar os itens novamente abaixo
    feedItems = [];

    querySnapshot.forEach((itemDoc) => {
      const item = {
        id: itemDoc.id,
        ...itemDoc.data(),
      };

      // adiciona um a um os posts na variavel feedItems
      feedItems.push(item);
    });

    // atualiza o HTML com base nas novas informações que vieram do firestore
    // o primeiro paramentro é o que cria e coloca o html na página
    // o segundo parametro são minhas postagens do feed
    // o terceiro parametro é a lista de todos os likes na collection de likes do firestore
    updateUI(renderItems, feedItems, likes);
  });

  // repete o que foi feito com as postagens, mas dessa vez com os
  // likes presentes na collection de likes
  const postLikes = collection(db, 'PostLikes');
  const q2 = query(postLikes);
  onSnapshot(q2, (querySnapshot) => {
    // limpa a variavel que tem todos os likes
    likes = [];

    querySnapshot.forEach((itemDoc) => {
      const item = {
        id: itemDoc.id,
        ...itemDoc.data(),
      };

      // adiciona um a um os likes na variavel de lista de likes
      likes.push(item);
    });

    // atualiza o HTML. Isso é importante, porque dessa forma se mudar um like, ou uma postagem
    // ele vai atualizar automaticamente o site.
    updateUI(renderItems, feedItems, likes);
  });
};

export const publish = async (post) => {
  await addDoc(collection(db, 'Post'), post);
};

// usado set doc para gerarmos nosso proprio id ex:post1_user1..., se usasemos
// o addDoc o firebase geraria aleatoriamente ex:fmrjavnmdfkjnv
export const like = async (postId, userId) => {
  await setDoc(doc(db, 'PostLikes', `${postId}_${userId}`), { postId, userId });
};

export const dislike = async (postId, userId) => {
  await deleteDoc(doc(db, 'PostLikes', `${postId}_${userId}`));
};
