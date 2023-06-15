import { collection, addDoc } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const userData = (
  nameElement,
  lastnameElement,
  emailElement,
  userElement
) =>
  addDoc(collection(db, 'infos-add'), {
    name: nameElement,
    lastname: lastnameElement,
    email: emailElement,
    user: userElement,
  });

//aqui virá as funções de postagem, para ficarem guardadas
