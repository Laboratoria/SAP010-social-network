import { authLogin, authLoginGoogle, authLoginFacebook } from '../lib/index';
import './login.css';

export const validarEmail = (email) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return 'Formato de e-mail inválido';
  }
  return ''; // Retorna uma string vazia se o email for válido
};

export const validarSenha = (senha) => {
  if (senha.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }
  return '';
};

export const fazerLogin = (login, userEmail, userSenha, txtError) => {
  login.addEventListener('click', async (event) => {
    event.preventDefault();

    const emailInput = userEmail.value;
    const password = userSenha.value;
    const emailError = validarEmail(emailInput);
    const senhaError = validarSenha(password);

    if (emailError || senhaError) {
      // Se houver algum erro de email ou senha, exiba as mensagens de erro
      txtError.setAttribute('style', 'display: block');
      txtError.innerHTML = emailError || senhaError;
    } else {
      // Caso contrário, prossiga com o login
      authLogin(emailInput, password)
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch(() => {
          txtError.setAttribute('style', 'display: block');
          txtError.innerHTML = 'Usuário ou senha incorretos';
        });
    }
  });
};

export const loginUser = () => {
  const container = document.createElement('div');
  const template = `
  <div class="backgroundTwo">
  </div>
  <div class="imagens">
    <img class="imagemLogo" src="Img/ImagemDesktopmap.png" alt= "Imagem Ilustrativa de pessoas interagindo">
    <img class="imagemMap" src="Img/ImagemMap.png" alt= "Mapa de GPS Ilustrativo">
    <p class="subtitulo">O melhor site de avaliações do Brasil</p>
  </div>
  <section class="login-page">
    <section class="form">
      <form class="login-form show" method="post" id="login">
        <h1 class="login-titulo">Food Review</h1>
        <input id= "txtEmail" type="text" placeholder="Email" required />
        <input id= "txtPassword" type="password" placeholder="Senha" required/>
        <span class="txt-error" id="txtError"></span>
        <div class="buttons">
          <button class="full-width" id= "btnLogin" type="submit" name="send2">Entrar</button>
          <div class="social">
            <img class="logo" id="btn-google" src="Img/Google.png" alt= "Logo Google">
            <img class="logo" id="btn-face" src="Img/facebook.png" alt= "Logo Facebook">
          </div>
        </div>
        <p class="messageLogin">Não possui uma conta? <a href="#register" id="newAccount">Cadastrar</a></p>
      </form>
    </section>
  </section>
  `;

  container.innerHTML = template;
  const userEmail = container.querySelector('#txtEmail');
  const userSenha = container.querySelector('#txtPassword');
  const txtError = container.querySelector('#txtError');
  const login = container.querySelector('#btnLogin');
  const btnGoogle = container.querySelector('#btn-google');
  const btnFacebook = container.querySelector('#btn-face');

  // função para usuário fazer login
  fazerLogin(login, userEmail, userSenha, txtError);

  // login google
  const loginGoogle = () => {
    btnGoogle.addEventListener('click', () => {
      authLoginGoogle()
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch(() => {
          txtError.innerHTML = 'Usuário ou senha incorretos';
        });
    });
  };

  loginGoogle();

  // login facebook
  const loginFacebook = () => {
    btnFacebook.addEventListener('click', () => {
      authLoginFacebook()
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch(() => {
          txtError.innerHTML = 'Usuário ou senha incorretos';
        });
    });
  };

  loginFacebook();
  return container;
};
