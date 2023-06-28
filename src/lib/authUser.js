// aqui exportaras las funciones que necesites
// lembrar de colocar export nas funções
//verificar import e export de cada arquivo para ver os vinculos
/* export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
}; */


//criacao de usuario
//verificação de senha
//verificação de erro (catch e erros para fazer validação)
import { auth } from "./configfirebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
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
  });

