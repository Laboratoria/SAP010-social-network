import { myFunction } from '../lib/index.js';
// Import the functions you need from the SDKs you need - só para conectar o firebase com o cloud - não precisa fazer mais nada
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkvwr2TtB_LKDqEormFriM2wNFISeBLXw",
  authDomain: "social-network-lab-3ce72.firebaseapp.com",
  projectId: "social-network-lab-3ce72",
  storageBucket: "social-network-lab-3ce72.appspot.com",
  messagingSenderId: "374799295105",
  appId: "1:374799295105:web:2d3e096fcd76fac2c8e380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app // exporta para todo arquivo que queira usar a const app, que é a base do firebase

 