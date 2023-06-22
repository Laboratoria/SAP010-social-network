import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAppAuth } from './auth';
import { app } from './app';

// Obtém a instância do Firestore
const db = getFirestore(app);

export const createPost = (description) => {
  const auth = getAppAuth();
  return addDoc(collection(db, 'posts'), {
    name: auth.currentUser.displayName,
    author: auth.currentUser.uid,
    description,
    createdAt: new Date(),
    likes: [],
    whoLiked: [],
  });
};

export const accessPost = async () => {
  const allPosts = [];
  const postQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(postQuery);
  querySnapshot.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    allPosts.push(data);
  });
  return allPosts;
};

export const deletePost = async (postId) => {
  const docRef = doc(db, 'posts', postId);
  await deleteDoc(docRef);
};

export const updatePost = async (postId, newText) => {
  const docRef = doc(db, 'posts', postId);
  return updateDoc(docRef, newText);
};
