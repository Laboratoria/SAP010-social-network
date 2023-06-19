
import './login.css';
import { loginWithEmail } from '../../configFirebase/auth';



export default () => {
  const container = document.createElement('div');

  const template = `
    <h1> BEM VINDO A </h1>
    <img class="logo2" src="./images/logo2.png">
    <body>

      <fieldset>
        <legend> Acesse sua conta com </legend>
        <img class="logo4" src="./images/logo4.png">
        <button id="googleLoginButton">teste login com o Google</button>
        
        <ul class="FormularioLoginEmail">
          <label for="email">E-Mail</label><p>
          <input type="email" id="email" placeholder="Digite seu e-mail">
        </ul>
        <ul class="FormularioLoginSenha">
          <label for="senha">Senha</label><p>
          <input type="password" id="senha" placeholder="Digite sua senha">
        </ul>
        <button id="entrarButton">Entrar</button>
        <button id="registrarButton">Registrar</button><p>
        <a href="#register">Esqueceu a Senha? Clique aqui!</a>
      </fieldset>
    </body>
  `;

  container.innerHTML = template;

  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#entrarButton');
  const googleButton = container.querySelector('#googleLoginButton');

  // lidar com o evento de login
    const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Chamando a função de login com e-mail e senha.
    loginWithEmail(email, senha)
      .then(() => {
        window.location.hash = '#--nova ----pagina---acesso ';
      })
      .catch(() => {
        printErrorMessage('E-mail ou senha incorretos');
      });
  };

  loginButton.addEventListener('click', handleLogin);
 

  return container;
};
