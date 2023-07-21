import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from './configfirebase.js';

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
    uidUser: auth.currentUser.uid,
    date: timestamp,
    textPost: postagem,
    like: []
  });
  return document;
};

export const exibAllPosts = async () => {
  const allPosts = [];
  const listCollectionPosts = await getDocs(collection(db, 'posts'));

  listCollectionPosts.forEach((post) => {
    allPosts.push({ ...post.data(), id: post.id });
  });

  return allPosts;
};
