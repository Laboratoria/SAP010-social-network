import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDAFrLxC3iLqMT-5d4Y1RquSpleRihCbBA',
  authDomain: 'rede-social-7cc05.firebaseapp.com',
  projectId: 'rede-social-7cc05',
  storageBucket: 'rede-social-7cc05.appspot.com',
  messagingSenderId: '284109033488',
  appId: '1:284109033488:web:27015ff886e19de500ba95',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth, app, db, collection, addDoc,
}; /* db data base */
