import './login.css';
import { loginWithEmail } from '../../configFirebase/auth';

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
          <a href="">Esqueceu a senha? Clique aqui!</a>
        </div>
          <div class="botoes">
        <button id="entrarButton">Entrar</button>
        <button id="registrarButton">Registrar</button></div>
          </div>
          <h3>-- ou --</h3>
        <div class="google">
        <button id="googleLoginButton">Acesse sua conta com <img class="logo-google" src="./images/logo4.png"></button>
      </div>
      </fieldset>
  `;

  container.innerHTML = template;

  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#entrarButton');
  const googleButton = container.querySelector('#googleLoginButton');
  const registrarButton = container.querySelector('#registrarButton');

  // lidar com o evento de login
  const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    loginWithEmail(email, senha)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        printErrorMessage('E-mail ou senha incorretos');
      });
  };

  loginButton.addEventListener('click', handleLogin);

  registrarButton.addEventListener('click', () => {
    window.location.hash = '#register';
  });

  return container;
};
