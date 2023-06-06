// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBwUtX6bGKiCxUseL-9BSWHnBcdemENLIw",
  authDomain: "projredenetwork.firebaseapp.com",
  projectId: "projredenetwork",
  storageBucket: "projredenetwork.appspot.com",
  messagingSenderId: "1085114881833",
  appId: "1:1085114881833:web:b596a5955a9968c7ee8938"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//auth é para pegar a autenticação do firebase
export const auth = getAuth(app);
export const db = getFirestore(app);