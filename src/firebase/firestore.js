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
  getDoc,
} from 'firebase/firestore';
import { getAppAuth } from './auth';
import { app } from './app';

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
}

const posts = [
  { id: '1', likes: 0 },
  { id: '2', likes: 0 },
  { id: '3', likes: 0 },
];
const likes = [];

export const hasUserLikedPost = (postId, userId) => {
  return likes.some((like) => like.postId === postId && like.userId === userId);
};

export const likePost = (postId, userId) => {
  try {
    const userHasLikedPost = hasUserLikedPost(postId, userId);

    if (!userHasLikedPost) {
      const post = posts.find((post) => post.id === postId);
      if (post) {
        post.likes++;
      }

      likes.push({ postId, userId });
      console.log('Like agregado correctamente');
    } else {
      console.log('El usuario ya ha dado like a esta publicación');
    }
  } catch (error) {
    console.error('Error al dar like:', error);
    throw error;
  }

};
