import {auth, db} from './firebase.config'
import {signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";


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
};

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
/*const docRef = await addDoc(collection(db, "posts"), {
  texto: "mensagem",
});
*/

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