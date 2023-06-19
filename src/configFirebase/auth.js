// auth.js será para exportar funções relacionadas a autenticação 

//getAppAuth- retorno da autenticação do firebase
//getUserId - retorno do id do usuario

import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,} from 'firebase/auth';
import { app } from './configFirebase.js';
 
  

  export const getAppAuth = () => getAuth();

   //criar usuario
   export const createUserWithEmail = (name, email, password) => {
    const auth = getAppAuth();
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: `${name} ${lastName}`,
        });
      },
    );
  };
  

  //login 
  export const loginWithEmail = (email, password) => {
    const auth = getAppAuth();
    return signInWithEmailAndPassword(auth, email, password);
  };
    
  // id do usuario no firebase
  export const getUserId = () => {
    const auth = getAppAuth();
    return auth.currentUser.uid;
  };
  
  //retorno do usuario autenticado caso exista
  export const getUserName = () => {
    const auth = getAppAuth();
    const user = auth.currentUser;
    if (user) {
      return user.displayName;
    }
    return null;
  };
  
