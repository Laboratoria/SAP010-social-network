import {
  loginWithEmail,
  loginGoogle,
  loginFacebook,
} from '../../firebase/auth.js';
import { errorsFirebase } from '../../validations.js';

export default () => {
  const container = document.createElement('div');

  const templateLogin = `
    <section class='login-wrap'>
      <div class='left'>
        <figure class='logo-container'>
          <img src='./img/assets/logologin.png' class='logo' alt='Logo da ExploraAí'>
        </figure>
        <h1 class='title'>ExplorAí!</h1>
        <br>
        <h6 class='text-slogan'>COMPARTILHE EXPERIÊNCIAS E AVENTURAS.
          <br>
          RECEBA DICAS E INDICAÇÕES.
        </h6>
      </div>
      <div class='right'>
          <form class='login-form'>
          <br>

          <h2 class='subtitle'>Entrar</h2>
          <div class='inputs-container'>
            <input type='text' class='inputs-info' placeholder='E-MAIL' id='email' />
            <input type='password' class='inputs-info' placeholder='SENHA' id='senha' />
            <button type='button' id='show-password' class='button-eye'>
            <span class="icon-eye"><i class='fas fa-eye-slash'></i></span> 
            </button>
          </div>
          <nav>
            <button type='button' id='login-button' class='submit' href='#'>ENTRAR</button>
          </nav>
          <p id='error-message' class='error-message'></p>
          <div class='text'>
            Esqueceu a senha? <br>
            Não possui uma conta?
            <button type='button' class='register-here'><a href='#register' class='register-here'>Cadastre-se</a></button>
          </div>
          <div class='text'>
            Ou <br>
            Entrar com:
          </div>
          <figure>
            <button type='button' class='google-button' id='google-button'>
              <img src='img/assets/icongoogle.png' class='google-img' alt='Logo do Google'>
            </button>
            <button type='button' class='facebook-button' id='facebook-button'>
              <img src='img/assets/iconfacebook.png' class='facebook-img' alt='Logo do facebook'>
            </button>
            <p id='errorLogar' class='error-message'></p>
          </figure>
        </form>
      </div>
    </section>`;

  container.innerHTML = templateLogin;

  // Selecionando os elementos do formulário de login.
  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#login-button');
  const googleButton = container.querySelector('#google-button');
  const facebookButton = container.querySelector('#facebook-button');

  function printErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
  }
  function printErrorMessage2(message) {
    const errorMessage = document.getElementById('errorLogar');
    errorMessage.textContent = message;
  }

  // Função para lidar com o evento de login.
  const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Chamando a função de login com e-mail e senha.
    loginWithEmail(email, senha)
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch((error) => {
        const errorMessage = errorsFirebase(error.code) || 'Usuário e/ou senha incorretos';
        printErrorMessage(errorMessage);
      });
  };

  // Função para lidar com o evento de login com o Google.
  const handleGoogleLogin = () => {
    loginGoogle()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        printErrorMessage2('Erro ao logar com Google');
      });
  };

  const handleFacebookLogin = () => {
    loginFacebook()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        printErrorMessage2('Erro ao logar com Facebook');
      });
  };

  loginButton.addEventListener('click', handleLogin);

  googleButton.addEventListener('click', handleGoogleLogin);

  facebookButton.addEventListener('click', handleFacebookLogin);

  const button = container.querySelector('.button-eye');
  button.addEventListener('click', () => {
    const changeEye = container.querySelector('i');
    const input = container.querySelector('#senha');
    if (input.getAttribute('type') === 'text') {
      input.setAttribute('type', 'password');
      changeEye.classList.remove('fa-eye');
      changeEye.classList.add('fa-eye-slash');
    } else {
      input.setAttribute('type', 'text');
      changeEye.classList.remove('fa-eye-slash');
      changeEye.classList.add('fa-eye');
    }
  });

  return container;
};
