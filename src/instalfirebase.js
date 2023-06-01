// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSedT4wQAFd6nZqtK9xWVLPVSRAj9y9dE",
  authDomain: "rede-social-2c0e4.firebaseapp.com",
  projectId: "rede-social-2c0e4",
  storageBucket: "rede-social-2c0e4.appspot.com",
  messagingSenderId: "204673635885",
  appId: "1:204673635885:web:c3aaf53fe7e32b3f024aa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);