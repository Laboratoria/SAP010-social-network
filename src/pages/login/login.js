import './login.css';

import CBD from '../imagens/CBD.png';
import google from '../imagens/google.png';
import facebook from '../imagens/facebook.png';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container-login');

  const template = `
  <img class="img-CBD" src=${CBD} alt="logo app">
  <div class="container">
  <form class="form-entrar" action="#">
  <input class="input" type="email" name="email" id="" placeholder="E-MAIL" class="centro">
  <input class="input" type="password" name="senha" id="" placeholder="SENHA" class="centro">
  <button type="submit" class="entrar centro">ENTRAR</button>
  </form>
  <div class="ou-box">
  <span class="ou">OU</span>
  <div class="login-redes">
  <img class="img-google" src=${google} alt="logo Google">
  <img class="img-facebook" src=${facebook} alt="logo Facebook">
  </div>
  <span class="texto centro">Ainda não tem conta?</span>
  <span class="texto centro">Criar nova conta</span>
  </div>
  </div>`;

  container.innerHTML = template;

  return container;
};
