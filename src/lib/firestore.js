import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../Firebase/instalfirebase';

export const getFeedItems = async () => {
  const feedItems = [];
  const feedPost = collection(db, 'Post');
  const q = query(feedPost, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data(),
    };
    feedItems.push(item);
  });
  return feedItems;
};

export const publish = async (post) => {
  await addDoc(collection(db, 'Post'), post);
};
