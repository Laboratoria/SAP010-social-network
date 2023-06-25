import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCkvwr2TtB_LKDqEormFriM2wNFISeBLXw',
  authDomain: 'social-network-lab-3ce72.firebaseapp.com',
  projectId: 'social-network-lab-3ce72',
  storageBucket: 'social-network-lab-3ce72.appspot.com',
  messagingSenderId: '374799295105',
  appId: '1:374799295105:web:2d3e096fcd76fac2c8e380',
};
firebase.initializeApp(firebaseConfig);

const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {
  app, auth, db, storage,
};
