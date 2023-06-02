// Este es el punto de entrada de tu aplicacion - só manipulação de DOM - elements HTML

<<<<<<< HEAD
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

=======
import { myFunction, CriarUsuario } from './lib/index.js';
>>>>>>> 06fb8a4a82f03ce401d96d7faaac84667d4ebde1


myFunction();
