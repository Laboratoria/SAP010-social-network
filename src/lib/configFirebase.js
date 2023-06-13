// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJEA0F1mx6VNcCZRfXe6SH4mw9uNpaFnY',
  authDomain: 'coffee-station-32427.firebaseapp.com',
  projectId: 'coffee-station-32427',
  storageBucket: 'coffee-station-32427.appspot.com',
  messagingSenderId: '515057240877',
  appId: '1:515057240877:web:7fb3e958dc0b26888e21a4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();