// aqui exportaras las funciones que necesites

// export const myFunction = () => {
//   // aqui tu codigo
//   console.log('Hola mundo!');
// };

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "./firebase-config";

export function cadastrarUsuario(email, senha) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('usuário cadastrado com sucesso')
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`)
        });
}
