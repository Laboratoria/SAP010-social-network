import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

const db = getFirestore(app);

export const userData = (name, lastname) =>
  addDoc(collection(db, 'infos-add'), {
    nome: name,
    sobrenome: lastname,
  });

//aqui virá as funções de postagem, para ficarem guardadas
