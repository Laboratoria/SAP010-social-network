import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAS54cKJAeG89RM6F7I4Z_FebhCmPi65o',
  authDomain: 'social-network-5b868.firebaseapp.com',
  databaseURL: 'https://social-network-5b868-default-rtdb.firebaseio.com',
  projectId: 'social-network-5b868',
  storageBucket: 'social-network-5b868.appspot.com',
  messagingSenderId: '515527831334',
  appId: '1:515527831334:web:85445b3610e84e7c56dbe7',
  measurementId: 'G-TZ3QG03NVJ',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getUsers(db) {
  const usersCol = collection(db, 'users');
  const usereSnapahot = await getDocs(usersCol);
  const usereList = usereSnapahot.docs.maps((doc => doc.data()));
  return usereList;
}