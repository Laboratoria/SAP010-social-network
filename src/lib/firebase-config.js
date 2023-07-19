// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEK-4d-9VmCDMulufoLS010Jul552nTfI",
  authDomain: "fight-back-3c119.firebaseapp.com",
  projectId: "fight-back-3c119",
  storageBucket: "fight-back-3c119.appspot.com",
  messagingSenderId: "856302366263",
  appId: "1:856302366263:web:353194250250ae8d3519b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
  app, auth
}