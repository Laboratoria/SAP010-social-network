import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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

// essa função utiliza as funções "collection" e "getDocs" do Firestore Lite para obter
// a coleção de usuários do banco de dados e retorna uma lista com os dados desses usuários.
export async function getUsers(db) {
  const usersCol = collection(db, 'users');
  const usereSnapahot = await getDocs(usersCol);
  const usereList = usereSnapahot.docs.maps((doc => doc.data()));
  return usereList;
}

