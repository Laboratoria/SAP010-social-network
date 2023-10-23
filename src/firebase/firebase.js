// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCIlJ7_NYHgBnZ3hTCABU5h51VR5oMz3bc',
  authDomain: 'rede-social-9ce25.firebaseapp.com',
  projectId: 'rede-social-9ce25',
  storageBucket: 'rede-social-9ce25.appspot.com',
  messagingSenderId: '528688631413',
  appId: '1:528688631413:web:b29bcb68a7c440f3e9f23c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const storage = getStorage(app);