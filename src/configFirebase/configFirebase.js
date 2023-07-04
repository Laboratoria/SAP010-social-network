// Firebase configuration
import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';

const firebaseConfig = ({
  apiKey: 'AIzaSyDJEA0F1mx6VNcCZRfXe6SH4mw9uNpaFnY',
  authDomain: 'coffee-station-32427.firebaseapp.com',
  projectId: 'coffee-station-32427',
  storageBucket: 'coffee-station-32427.appspot.com',
  messagingSenderId: '515057240877',
  appId: '1:515057240877:web:7fb3e958dc0b26888e21a4',
});

// const provider = new GoogleAuthProvider();

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { collection, getDocs, addDoc };
