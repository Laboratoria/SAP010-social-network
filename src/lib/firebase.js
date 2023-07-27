// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
//   console.log('Hola mundo!');
// };
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from './firebase-config.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export function cadastrarUsuario(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

export function atualizarNomeDoUsuario(nome) {
  return updateProfile(auth.currentUser, {
    displayName: nome, photoURL: 'https://static.thenounproject.com/png/5034901-200.png',
  });
}

export function loginUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

export function sairDaConta() {
  return signOut(auth);
}

export function redefinirSenha(email) {
  return sendPasswordResetEmail(auth, email);
}

export async function adicionarPost(username, conteudo) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      username: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      conteudo,
    });
    console.log("Document written with ID: ", docRef.id);
    return { username, conteudo };
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export async function exibirPosts() {
  try {
  const feedElement = document.querySelector('.post');
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    const postElement= document.createElement('div');
    postElement.innerHTML = `<h2>${post.username}</h2>
    <p>${post.conteudo}</p>`;
    feedElement.appendChild(postElement);
    console.log(`teste1 ${doc.id} => ${doc.data()}`);
  });
} catch (error) {
  console.error('erro ao obter os posts', error);
}
};
