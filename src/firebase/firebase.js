import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut,
} from 'firebase/auth';

import {
  setDoc, doc, collection, serverTimestamp, getDocs,
} from 'firebase/firestore';

import {
  app, db,
} from './firebase.config';

const auth = getAuth(app);

const isUserLoggedIn = async (user) => {
  if (user !== null) {
    return true;
  }
  return false;
};

const logIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('logou o usuario');
    }).then(() => isUserLoggedIn())
    .catch((error) => console.log(error.message));
};

const logOut = async () => {
  await signOut(auth);
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  await signInWithPopup(auth, provider);
};

const registerUserWithAnotherProvider = async (id, name, username, email) => {
  try {
    const userData = {
      id,
      name,
      username,
      email,
    };
    await setDoc(doc(db, 'users', `${email}`), userData);
    console.log('Usuário cadastrado com sucesso');
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error.message);
  }
};

const registerUser = async (name, username, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const userData = {
      id: auth.currentUser.uid,
      name,
      username,
      email,
    };
    await setDoc(doc(db, 'users', `${email}`), userData);
    console.log('Usuário cadastrado com sucesso');
  } catch (error) {
    console.log('Erro ao cadastrar usuário:', error.message);
  }
};

const createPost = async (textPost) => {

  const uid = auth.currentUser.uid;
  const name = auth.currentUser.displayName;

  const post = {
    id: uid,
    user: name,
    content: textPost,
    likes: 0,
    dateTime: serverTimestamp(),
  };

  const docRef = doc(collection(db, 'posts'));
  await setDoc(docRef, post);
};

const listAllPosts = async () => {
  const posts = [];
  const ref = collection(db, 'posts');
  const snapshot = await getDocs(ref);
  snapshot.forEach(doc => {
    posts.push(doc.data());
  });
  return posts;
};

export {
  registerUserWithAnotherProvider, registerUser, logIn, signInWithGoogle, signInWithGitHub,
  isUserLoggedIn, logOut, auth, signInWithPopup, createPost, listAllPosts
};
