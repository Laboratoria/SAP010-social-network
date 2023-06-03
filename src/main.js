import { mostrarFormularioLogin } from './pages/login/login.js';
import { mostrarFormularioRegistro } from './pages/register/register.js';


window.onload = function() {
  const body = document.getElementsByTagName('body')[0];

  const titulo = document.createElement('h1');
  titulo.innerHTML = 'ExploraAí!';
  body.appendChild(titulo);

  const loginBtn = createButton('ENTRAR', mostrarFormularioLogin);
  body.appendChild(loginBtn);

  const registerBtn = createButton('CRIAR CONTA', mostrarFormularioRegistro);
  body.appendChild(registerBtn);
}

function createButton(text, onclick) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.onclick = onclick; // usar addEventListener nao onclick
  return button;
}

