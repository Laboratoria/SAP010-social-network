import { collection, addDoc, getDocs } from 'firebase/compat/firestore';
import { auth } from './configfirebase.js';

/* collection,
db,
auth,
addDoc,
getDoc,
updateDoc,
getDocs,
doc */

export const posts = async (postagem) => {
  const timestamp = new Date().getTime();
  const document = await addDoc(collection(db, 'posts'), {
    nameUser: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    date: timestamp,
    textPost: postagem,
    likes: [], timestamp
  });
  return document;
};

export const exibAllPosts = async () => {
  const allPosts = [];
  const querySnapshot = await getDocs(collection(db, 'posts'));

  querySnapshot.forEach((post) => {
    allPosts.push({ ...post.data(), id: post.id });
  });

  return allPosts;
};
