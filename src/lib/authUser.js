//criacao de usuario
//verificação de senha
//verificação de erro (catch e erros para fazer validação)
//import { getAppAuth, getAuth } from "./configfirebase.js";
import { app } from "./configfirebase.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";

/* // Initialize Firebase Authentication and get a reference to the service
import { createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);

const email = "abacate@teste.com";
const password = "123456";
createUserWithEmailAndPassword(auth, email, password); */

//criar aqui função para fazer cadastro
//criar aqui função para fazer login

/* createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Logado:", user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("deu errado", errorCode, errorMessage)
    // ..
  }); */

  //Criar Usuário
  export function cadastroUsuarioSenha(nomeCompleto, usuario, email, senha){
    const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, senha).then(
    (userCredential) => {
      console.log("entrei");
      const user = userCredential.user;
      window.location.hash = '#feed';
      updateProfile(user, {
        displayName: `${usuario}`,
      });
    },
  );
    //verificar preenchimento pelo usuario de usuario e senha (antes de passar por teste de cadastro)
    //verificar quais parametros vão ser vinculados ao perfil via firebase
  };  

  //Login
  export function loginEmail(email, senha){
        const auth = getAppAuth();
        return signInWithEmailAndPassword(auth, email, senha)
        //verificar preenchimento pelo usuario de usuario e senha (antes de passar por teste de login)
        //INVALID_EMAIL (usar para criar função de verificação)    
    };
        
 // login google
export const getAppAuth = () => getAuth(app);
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
}; 

// autenticacao usuario testando
export const getUserName = () => {
  const auth = getAppAuth();
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return null;
};

// id do usuario no firebase
export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};
