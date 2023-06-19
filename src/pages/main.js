// Este es el punto de entrada de tu aplicacion

// rotas
import login from "./pages/login/login.js";
import register from "./pages/register/register.js";

const main = document.querySelector('#root');

// import { myFunction } from './lib/index.js';



// myFunction();

import { auth, provider } from './lib/configFirebase.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';





