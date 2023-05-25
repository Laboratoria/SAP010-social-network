/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCnAt2p03OMLja3F4Py_O3K3t7si5vSDrQ',
  authDomain: 'social-network-237a8.firebaseapp.com',
  projectId: 'social-network-237a8',
  storageBucket: 'social-network-237a8.appspot.com',
  messagingSenderId: '1090154004073',
  appId: '1:1090154004073:web:64244bc7454f3bc2dfacf8',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
