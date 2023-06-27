// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAFrLxC3iLqMT-5d4Y1RquSpleRihCbBA",
  authDomain: "rede-social-7cc05.firebaseapp.com",
  projectId: "rede-social-7cc05",
  storageBucket: "rede-social-7cc05.appspot.com",
  messagingSenderId: "284109033488",
  appId: "1:284109033488:web:27015ff886e19de500ba95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

