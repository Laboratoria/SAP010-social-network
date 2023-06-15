// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';
// rotas



// myFunction();



import { auth, provider } from './lib/configFirebase.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const email = 'teste@coffeestation.com';
const password = '123456';

createUserWithEmailAndPassword(auth, email, password);



