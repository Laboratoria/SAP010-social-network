import { collection, query, getDocs, doc, addDoc, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/instalfirebase';

export const getFeedItems = async () => {
  const feedItems = []
  const feedPost = collection(db, 'Post');
  const q = query(feedPost, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const item = {
      id: doc.id,
      ...doc.data(),
    };
    feedItems.push(item)
  });
  return feedItems
};

export const publish = async (post) => {
  const docRef = await addDoc(collection(db, "Post"), post);
  console.log("Document written with ID: ", docRef.id);
}