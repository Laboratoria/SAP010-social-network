// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw4SzPyWd6RTvvNqguANWBromr-XyNc5E",
    authDomain: "mulheres-viajantes-5253f.firebaseapp.com",
    projectId: "mulheres-viajantes-5253f",
    storageBucket: "mulheres-viajantes-5253f.appspot.com",
    messagingSenderId: "267227895129",
    appId: "1:267227895129:web:08126e7de8a05a6b30a848"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  export const db = getFirestore(app);


  
  