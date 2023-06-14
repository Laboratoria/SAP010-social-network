import { authLogin } from '../Firebase/instalfirebase';

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
</div>
<section class="login-page">
<section class="form">
  <form class="login-form show" method="post" id="login">
    <section class="titulos">
      <h1 class="titulo">Food Review</h1>
      <p class="subtitulo1">O melhor site de avaliações do Brasil</p>
      <p class="subtitulo2">Acesse e saiba mais!!</p>
    </section>
    <section>
      <input id=txtEmail type="text" placeholder="Email" required />
      <input id=txtPassword type="password" placeholder="Senha" required/>
      <span class="txt-error hide" id="txtError"></span>
      <button id=btnLogin type="submit" name="send2">Entrar</button>
      <p class="subtitulo2">Ou</p>
      <img class="logo" src="Img/Google.png" alt= "Logo Google">
      <img class="logo" src="Img/facebook.png" alt= "Logo Facebook">
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
