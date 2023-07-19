// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';
import landingPage from './landing-page';
import { intro } from './intro.js';
import { pedirCadastro } from './pedir-cadastro.js';

const root = document.querySelector('#root');
let carregouForm = false;

function apresentacao() {
  root.appendChild(intro());
}

function cadastroOuLog() {
  if (carregouForm === false) {
    root.appendChild(pedirCadastro());
    carregouForm = true;
  }
}

window.addEventListener('load', () => {
  root.appendChild(landingPage());

  setTimeout(apresentacao, 3500);

  setTimeout(() => {
    cadastroOuLog();
    document.getElementById('start-coffee').addEventListener('click', () => cadastroOuLog(carregouForm));
  }, 8000);
  // document.getElementById('start-coffee').addEventListener('click', () => cadastroOuLog());
  // setTimeout(cadastroOuLog, 8000);
});
