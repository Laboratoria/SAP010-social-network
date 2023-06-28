import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { collection, query, getDocs, doc, addDoc, orderBy } from 'firebase/firestore';
import { auth, db } from '../Firebase/instalfirebase';

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




// const q = query(collection(db, "cities"), where("state", "==", "CA"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   const cities = [];
//   querySnapshot.forEach((doc) => {
//       cities.push(doc.data().name);
//   });
//   console.log("Current cities in CA: ", cities.join(", "));
// });






export const authStateChanged = (callback) => {
  onAuthStateChanged(auth, callback);
};

// função para fazer login do usuario
export const authLogin = (email, senha) =>
  signInWithEmailAndPassword(auth, email, senha);

// função para login da conta do google
const authProvedor = new GoogleAuthProvider();
export const authLoginGoogle = () => signInWithPopup(auth, authProvedor);

// incluir displayName nos parametros se for usar futuramente
export const newUser = async (email, senha, displayName) => {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, { displayName });
};

const provider = new FacebookAuthProvider();
export const authLoginFacebook = () => signInWithPopup(auth, provider);

export const logout = async () => {
  await signOut(auth);
  window.location.hash = "";
};
