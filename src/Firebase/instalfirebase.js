import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyDSedT4wQAFd6nZqtK9xWVLPVSRAj9y9dE',
  authDomain: 'rede-social-2c0e4.firebaseapp.com',
  projectId: 'rede-social-2c0e4',
  storageBucket: 'rede-social-2c0e4.appspot.com',
  messagingSenderId: '204673635885',
  appId: '1:204673635885:web:c3aaf53fe7e32b3f024aa4',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);