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
  // onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase-config.js';
// db
// import { collection, addDoc, getDocs } from 'firebase/firestore';

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

// export function identificarUsuarioConectado() {
//   return onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in
//       const uid = user.uid;
//       console.log(uid);
//       // ...
//     } else {
//       // User is signed out
//     }
//   });
// }

export function redefinirSenha(email) {
  return sendPasswordResetEmail(auth, email);
};

// export async function teste() {
//   try {
//     const docRef = await addDoc(collection(db, "usuarios"), {
//       name: auth.currentUser.displayName,
//       uid: auth.currentUser.uid,
//       photo: auth.currentUser.photoURL,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

// export async function lerDadosTeste() {
//   const querySnapshot = await getDocs(collection(db, "usuarios"));
//   querySnapshot.forEach((doc) => {
//     console.log(`teste1 ${doc.id} => ${doc.data()}`);
//   });
// };
