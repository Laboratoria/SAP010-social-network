import { authLogin } from '../Firebase/instalfirebase';
import '../Login/login.css';

export const loginUser = () => {
  const container = document.createElement('div');
  const template = `
<div class="backgroundTwo">
  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
  </svg>
</div>
<div class="imagens">
  <img class="imagemLogo" src="Img/ImagemDesktopmap.png" alt= "Imagem Ilustrativa de pessoas interagindo">
  <img class="imagemMap" src="Img/ImagemMap.png" alt= "Mapa de GPS Ilustrativo">
  <p class="subtitulo">O melhor site de avaliações do Brasil</p>
</div>
<section class="login-page">
  <section class="form">
    <form class="login-form show" method="post" id="login">
      <section class="titulos">
        <h1 class="titulo">Food Review</h1>
      </section>
      <section>
        <input id=txtEmail type="text" placeholder="Email" required />
        <input id=txtPassword type="password" placeholder="Senha" required/>
        <div class="buttons">
          <button class="full-width" id=btnLogin type="submit" name="send2">Entrar</button>
          <div class="social">
            <img class="logo" src="Img/Google.png" alt= "Logo Google">
            <img class="logo" src="Img/facebook.png" alt= "Logo Facebook">
          </div>
        </div>
        <p class="message">Não possui uma conta? <a href="#" id="newAccount">Cadastrar</a></p>
      </section>
    </form>
  `;

  container.innerHTML = template;
  const email = container.querySelector('#txtEmail');
  const senha = container.querySelector('#txtPassword');
  const txtError = container.querySelector('#txtError');
  const login = container.querySelector('#btnLogin');

  const fazerLogin = () => {
    login.addEventListener('click', () => {
      authLogin(email.value, senha.value)
        .then(() => {
          window.location.href = '#feed';
        })
        .catch(() => {
          txtError.setAttribute('style', 'display: block');
          txtError.innerHTML = 'Usuário ou senha incorretos';
        });
    });
  };
  fazerLogin();

  return container;
};
