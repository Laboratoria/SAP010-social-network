// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8zikyXf7G5y9OpRG2rppQF0ozv6LESCs",
  authDomain: "social-network-af062.firebaseapp.com",
  projectId: "social-network-af062",
  storageBucket: "social-network-af062.appspot.com",
  messagingSenderId: "887520259995",
  appId: "1:887520259995:web:a5035a6804239ee20d3b3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "dunes@gmail.com"
const password = "123456"

createUserWithEmailAndPassword(auth, email, password)



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY3UkDzyQQt6bkMRjawouhmYdhqfv_Tag",
  authDomain: "exemplo-89631.firebaseapp.com",
  projectId: "exemplo-89631",
  storageBucket: "exemplo-89631.appspot.com",
  messagingSenderId: "489576568604",
  appId: "1:489576568604:web:bd304747c79b7e2f498cd9",
  measurementId: "G-JXS5G494MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const email = "abacatee@frutas.com"
const password = "123456"

createUserWithEmailAndPassword(auth, email, password)
myFunction();
