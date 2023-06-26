// Este es el punto de entrada de tu aplicacion
// main controla qual página que vai abrir 
/* import { } from './pages/Cadastro/cadastro.js';
import { } from './pages/Feed/feed.js';
import { } from './pages/Login/login.js';
import { } from './pages/Perfil/perfil.js'; */
import { myFunction } from './lib/firebase.js';

myFunction();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM8SWdcckahTdJcmCb_jMlO74O6HaTb38",
  authDomain: "filmeredesocial.firebaseapp.com",
  projectId: "filmeredesocial",
  storageBucket: "filmeredesocial.appspot.com",
  messagingSenderId: "151656769388",
  appId: "1:151656769388:web:1abd32849c90385ec27549",
  measurementId: "G-Y6MQJS60R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);