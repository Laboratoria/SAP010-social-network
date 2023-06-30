import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayRemove,
  onSnapshot,
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

export const accessPost = (updateListPost) => {
  const allPosts = [];
  const postQuery = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
  );

  onSnapshot(postQuery, (querySnapshot) => {
    allPosts.length = 0;

    querySnapshot.forEach((post) => {
      const data = post.data();
      data.id = post.id;
      allPosts.push(data);
    });
    updateListPost(allPosts);
  });
};

export const deletePost = async (postId) => {
  const docRef = doc(db, 'posts', postId);
  await deleteDoc(docRef);
};

export const updatePost = async (postId, newText) => {
  const docRef = doc(db, 'posts', postId);
  return updateDoc(docRef, newText);
};

export const hasUserLikedPost = async (postId) => {
  const docRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(docRef);
  if (docSnap && docSnap.exists) {
    const post = docSnap.data();
    const { whoLiked } = post;
    const currentUser = getAppAuth().currentUser;
    if (currentUser && currentUser.uid) {
      const userId = currentUser.uid;
      return whoLiked.includes(userId);
    }
  }
  return false;
};

export const likePost = async (postId, userId) => {
  try {
    const userHasLikedPost = await hasUserLikedPost(postId);
    if (!userHasLikedPost) {
      const docRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(docRef);
      if (postDoc && postDoc.exists) {
        const post = postDoc.data();
        const { whoLiked } = post;
        if (!whoLiked.includes(userId)) {
          whoLiked.push(userId);
          await updateDoc(docRef, { whoLiked });
        }
        return 'adicione like';
      }
    } else {
      const washingtonRef = doc(db, 'posts', postId);
      await updateDoc(washingtonRef, {
        whoLiked: arrayRemove(userId),
      });
      return 'remove like';
    }
  } catch (error) {
    console.error('Error ao dar like:', error);
    throw error;
  }
  return '';
};
