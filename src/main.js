// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';
import landingPage from './landing-page';
import { intro } from './intro.js';
import { pedirCadastro } from './pedir-cadastro.js';

const root = document.querySelector('#root');

function apresentacao() {
  root.appendChild(intro());
}

window.addEventListener('load', () => {
  root.appendChild(landingPage());

  setTimeout(apresentacao, 5000); //
});

document.getElementById('comecar').addEventListener('click', pedirCadastro());
