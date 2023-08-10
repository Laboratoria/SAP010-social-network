import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./configurações_do_firebase/"; /*importei do configurações do firebase*/

export function cadastrarEmail (email, password) {
createUserWithEmailAndPassword(auth, email, password) 
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(userCredential.user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(error) 
  });
}
/*chamei console.log para catch e then*/ /*estudar promisses*/