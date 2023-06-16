// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCkvwr2TtB_LKDqEormFriM2wNFISeBLXw',
  authDomain: 'social-network-lab-3ce72.firebaseapp.com',
  projectId: 'social-network-lab-3ce72',
  storageBucket: 'social-network-lab-3ce72.appspot.com',
  messagingSenderId: '374799295105',
  appId: '1:374799295105:web:2d3e096fcd76fac2c8e380',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
