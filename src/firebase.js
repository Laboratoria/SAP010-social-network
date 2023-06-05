// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdXF_2uQ3kxNBTYIFua1-3HFgdLUoiC6Q",
  authDomain: "social-network-f5b19.firebaseapp.com",
  projectId: "social-network-f5b19",
  storageBucket: "social-network-f5b19.appspot.com",
  messagingSenderId: "201443918698",
  appId: "1:201443918698:web:4fa93e0b8f2a8c3d069b13",
  measurementId: "G-XNLQK083M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

myFunction();