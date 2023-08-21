import {auth} from './firebase.config'
// Este es el punto de entrada de tu aplicacion

// TODO: Add SDKs for Firebase products that you want to use
import {signInWithEmailAndPassword } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

export function entrar (email, password){
signInWithEmailAndPassword(auth, email, password)

.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Deu certo!!")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Deu errado!!")
    // ..
  });
}


/*function entrar (){
  const auth = null;
firebase.auth().createUserWithEmailAndPassword(
auth, document.getElementById(email).value, 
document.getElementById(password).value)

.then(function(user){
  // Signed in 
  auth = user;
  console.log("Deu certo!!")
  // ...
  document.getElementById(email).value = ""
  document.getElementById(password).value = ""
}).catch(function(error) {
  
  console.log("Deu errado!!")
  // ..
});
}
*/