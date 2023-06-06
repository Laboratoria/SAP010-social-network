import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCuYGseQ76VU2UN6ux7F_7Lqkg9HT3Dl_A',
  authDomain: 'social-network-1e938.firebaseapp.com',
  projectId: 'social-network-1e938',
  storageBucket: 'social-network-1e938.appspot.com',
  messagingSenderId: '1011964549721',
  appId: '1:1011964549721:web:3aaff419c0049a0612af48',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// essa função utiliza as funções "collection" e "getDocs" do Firestore Lite para obter
// a coleção de usuários do banco de dados e retorna uma lista com os dados desses usuários.
export async function getUsers(database) {
  const usersCol = collection(database, 'users');
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}
