import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc
} from 'firebase/firestore';
import { getAppAuth } from './auth';
import { app } from './app';

// variable firestone
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

export async function accessPost() {
  const allPosts = [];
  const postQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(postQuery);
  querySnapshot.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    allPosts.push(data);
  });
  return allPosts;
}

export async function editPost(idPost, newPost) {
  const docRef = doc(db, 'posts', idPost);
  return updateDoc(docRef, newPost);
}

