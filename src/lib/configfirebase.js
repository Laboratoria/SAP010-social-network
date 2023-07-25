import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBM8SWdcckahTdJcmCb_jMlO74O6HaTb38',
  authDomain: 'filmeredesocial.firebaseapp.com',
  projectId: 'filmeredesocial',
  storageBucket: 'filmeredesocial.appspot.com',
  messagingSenderId: '151656769388',
  appId: '1:151656769388:web:1abd32849c90385ec27549',
  measurementId: 'G-Y6MQJS60R4',
};

firebase.initializeApp(firebaseConfig);
// Inicialização do Firebase
export const app = firebase.app();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
