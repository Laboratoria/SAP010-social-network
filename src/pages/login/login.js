import './login.css';
import { loginWithEmail, loginGoogle } from '../../configFirebase/auth';

export default () => {
  const container = document.createElement('div');

  const template = `
  <div class="imagens">
    <img class="logo-cs" src="./images/logo1.png">
    <img class="imagem-fundo" src="./images/background-desktop.png">
  </div>
    <fieldset>
      <h2>Entre com</h2>
      <div class="loginSenha">
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="Digite seu e-mail">
      <label for="senha">Senha</label>
      <input type="password" id="senha" placeholder="Digite sua senha">
      <img class="eye" id="eyeToggle" src="./images/icons/eye-off.svg">
      <div id="errorMessage" class="error">
      </div>
      <a href="">Esqueceu a senha? Clique aqui!</a>
      </div>
        <div class="botoes">
        <button id="entrarButton">Entrar</button>
        <button id="registrarButton">Registrar</button></div>
          </div>
          <h3>-- ou --</h3>
        <div class="google">
        <button id="googleLoginButton">Acesse com sua conta <img class="logo-google" src="./images/logo4.png"></button>
       </div>
      
       <footer> Desenvolvedoras: Aline Ferreira, Josi Corrêa e Nara Monteiro </footer>
      </fieldset>
  `;

  container.innerHTML = template;

  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#entrarButton');
  const googleButton = container.querySelector('#googleLoginButton');
  const registrarButton = container.querySelector('#registrarButton');

  // login
  const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    loginWithEmail(email, senha)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        const errorMessage = container.querySelector('#errorMessage');
        errorMessage.textContent = 'E-mail ou senha incorretos';
        errorMessage.style.display = 'block';
      });
  };

  loginButton.addEventListener('click', handleLogin);

  registrarButton.addEventListener('click', () => {
    window.location.hash = '#register';
  });

  const eyeToggle = container.querySelector('#eyeToggle');
  const passwordInput = container.querySelector('#senha');

  eyeToggle.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeToggle.src = '../images/icons/eye.svg';
      eyeToggle.title = 'Esconder senha';
    } else {
      passwordInput.type = 'password';
      eyeToggle.src = '../images/icons/eye-off.svg';
      eyeToggle.title = 'Mostrar senha';
    }
  });

  // Login Google
  googleButton.addEventListener('click', () => {
    loginGoogle().then(() => {
      window.location.hash = '#feed';
    }).catch(() => {
    });
  });

  return container;
};
