// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import home from './pages/home/home';
import cadastro from './pages/cadastro/cadastro';
import login from './pages/login/login';

const principal = document.querySelector('#principal');

const init = () => {
  window.addEventListener('hashchange', () => {
    principal.innerHTML = '';
    // console.log(window.location.hash);
    switch (window.location.hash) {
      case '':
        principal.appendChild(home());
        break;
      case '#login':
        principal.appendChild(login());
        break;
      default:
        if (window.location.hash.includes('cadastro')) {
          principal.appendChild(cadastro());
        } else {
          principal.appendChild(home());
        }
    }
  });
};

window.addEventListener('load', () => {
  principal.appendChild(home());
  init();
});

const firebaseConfig = {
  apiKey: "AIzaSyAEK-4d-9VmCDMulufoLS010Jul552nTfI",
  authDomain: "fight-back-3c119.firebaseapp.com",
  projectId: "fight-back-3c119",
  storageBucket: "fight-back-3c119.appspot.com",
  messagingSenderId: "856302366263",
  appId: "1:856302366263:web:353194250250ae8d3519b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);