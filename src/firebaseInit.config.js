import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, query, getDocs,
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
const fetchData = async () => {
  const q = query(collection(db, 'Post'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, '=>', doc.data());
  });
};

fetchData();

export { auth, app, db }; /* db data base */
