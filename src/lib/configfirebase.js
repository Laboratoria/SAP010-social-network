//import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//para o feed usar db
//export const db = getFirestore(app);