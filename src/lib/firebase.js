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
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from './firebase-config.js';

export function cadastrarUsuario(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

export function atualizarNomeDoUsuario(nome) {
  return updateProfile(auth.currentUser, {
    displayName: nome,
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

export async function adicionarPost(username, conteudo, nivel) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      username: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      conteudo,
      nivel,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
  return { username, conteudo };
}

export async function exibirPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const feedElement = document.querySelector('.post');
    feedElement.innerHTML = '';
    const array = [];
    querySnapshot.forEach((doc) => {
      //   const post = doc.data();
      //   const postElement = document.createElement('div');
      //   postElement.innerHTML = `<h2>${post.username}</h2>
      // <p>${post.conteudo}</p>
      // <hr>`;
      //   feedElement.appendChild(postElement);
      array.push(doc.data());
      // console.log(`${doc.id} => ${doc.data()}`);
      return array;
    });
  } catch (error) {
    console.error('erro ao obter os posts', error);
  }
}
