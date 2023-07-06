//import { myFunction } from './lib/firebase.js';

/* // Versão ANTIGA - NAO USAR - CUIDADO! FOGE! CORRE!
firebase.auth().qualquerCoisa()
  .then(....) 
  .catch(....)

firebase.firestore().qualquerCoisa()
  .then(....) 
  .catch(....) */
  
//myFunction();

// Import the functions you need from the SDKs you need
//import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//para o feed usar db
//export const db = getFirestore(app);