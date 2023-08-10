import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
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
  const docRef = await addDoc(collection(db, 'posts'), {
    username: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
    conteudo,
    nivel,
  });
  return { docRef, username, conteudo };
}

export async function deletarPost(postId) {
  console.log(postId);
  await deleteDoc(doc(db, 'posts', postId));
}

export async function exibirPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    console.log(querySnapshot);
    if (!querySnapshot.docs.length) {
      console.log('A collection está vazia.');
      return { querySnapshot, array: [] };
    }
    const array = [];
    querySnapshot.forEach((documento) => {
      const post = documento.data();
      array.push({
        ...post,
        id: documento.id,
      });
      // console.log(`${doc.id} => ${doc.data()}`);
    });
    console.log(querySnapshot);
    return array;
  } catch (error) {
    console.error('erro ao obter os posts', error);
    throw Error('erro ao obter os posts', error);
  }
}

export async function editarPost(postId, novoConteudo) {
  const docRef = doc(db, 'posts', postId);
  await updateDoc(docRef, {
    conteudo: novoConteudo,
  });
}
