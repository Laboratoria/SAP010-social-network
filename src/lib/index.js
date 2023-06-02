// Initialize Firebase - todas as funções do firebase
import app from "../firebase";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app); //app do firebase

export function CriarUsuario () {

}




const email = "maca@frutas.com"
const password = "123456"
createUserWithEmailAndPassword(auth, email, password)

.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("deu certo")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("deu errado")
  });// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};
