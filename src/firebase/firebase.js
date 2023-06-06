import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut,
} from 'firebase/auth';

import {
  query, where, getDocs, setDoc, doc,
} from 'firebase/firestore';

import {
  app, db, collection,
} from './firebase.config';

const auth = getAuth(app);

const isUserLoggedIn = async () => {
  console.log(auth);
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const uid = user.uid;
    console.log(`Nome do usuário ${displayName}`);
    console.log(`O e-mail do usuário é ${email}`);
    console.log(`O id do usuário é ${uid}`);
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

const emailAlreadyRegistered = async (email) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((docs) => {
    console.log(docs.id, '=>', docs.data().email);
    if (docs.data().email === docs.id) {
      alert('Este e-mail já está sendo utilizado por outro provedor');
    }
  });
};

export {
  registerUserWithAnotherProvider, registerUser, logIn, signInWithGoogle, signInWithGitHub,
  isUserLoggedIn, logOut, auth, emailAlreadyRegistered, signInWithPopup,
};
