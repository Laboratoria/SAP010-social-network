import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './configfirebase.js';

export const posts = async (postagem) => {
  const timestamp = new Date()
  const document = await addDoc(collection(db, 'posts'), {
    nameUser: auth.currentUser.displayName,
    uidUser: auth.currentUser.uid,
    date: timestamp,
    textPost: postagem,
    like: []
  });
  return document;
};
export const exibAllPosts = async () => {
  const allPosts = [];
  const orderListCollectionPosts = query(collection(db, 'posts'), orderBy('date', 'asc'));
  const trazerPost = await getDocs(orderListCollectionPosts);

  trazerPost.forEach((post) => {
    allPosts.push({ ...post.data(), id: post.id });
  });

  return allPosts;
};

export const deletePost = async (postId) => {
  const idRefPost = doc(db, "posts", postId);
  await deleteDoc(idRefPost);
}
