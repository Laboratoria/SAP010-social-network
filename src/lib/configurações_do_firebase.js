// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYfQSDWKXDG2PWMXLxHLjvpUI-frZzb7w",
  authDomain: "rede-mundo-azul.firebaseapp.com",
  projectId: "rede-mundo-azul",
  storageBucket: "rede-mundo-azul.appspot.com",
  messagingSenderId: "306525499269",
  appId: "1:306525499269:web:8180e77363657a30f55eec",
  measurementId: "G-785ZHW04D9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); /*exportei para o firebase.js*/
const db = getFirestore(app);