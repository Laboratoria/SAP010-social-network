import { loginEmail, loginGoogle } from "../../lib/authUser.js";
/*<link rel="stylesheet" type="text/css" href="pages/Login/login.css">*/

export default () => {
  const oldStyles = document.getElementsByTagName("link");
  if(oldStyles.length > 1) oldStyles[1].remove();
  const stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href','pages/Login/login.css');
  document.head.appendChild(stylesheet);

  const loginContainer = document.createElement('div');
  const templateLogin = `<div id="loginBackground"></div><div><header>
  <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
</header>
<div>
  <h2>Bem vinde a sua rede social de filmes</h2>
</div>
<div>
<fieldset>
  <div>
    <label for="email" id="emailLabel">
      <p>E-mail</p>
      <span></span>
      <input type="text" name="email" class="email" id="email">
    </label>
  </div>
  <div>
    <label for="senha" id="senhaLabel">
    <p>Senha</p>
    <span></span>
      <input type="password" name="senha" class="senha" id="senha">
    </label>
  </div>
  <button class="btn" id="btn-login-entrar">Entrar</button>
  <div id="errorMessage"></div>
  <br>
  <button class="btn btn-transparente" id="btn-login-esq-senha">Esqueceu a senha?</button>
  <br>
  <button class="btn btn-transparente" id="btn-login-google">Login com Google</button>
  <br>
  <button class="btn btn-escuro" id="btn-login-criar-conta">Não tem login? Crie sua conta agora</button>
</fieldset>
</div>
<footer>
<h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
<h6>Desenvolvido por Larissa,Maila e Vitória</h6>
<p>2023</p>
</footer></div>`;

  loginContainer.id = 'login';
  loginContainer.innerHTML = templateLogin;

  // Informações preenchidas pelo usuário
  const emailEntrada = loginContainer.querySelector('#email');
  const senhaEntrada = loginContainer.querySelector('#senha');
  const errorMessage = loginContainer.querySelector('#errorMessage');

  // Botões
  const entrarLoginBotao = loginContainer.querySelector('#btn-login-entrar');
  const criarLoginBotao = loginContainer.querySelector('#btn-login-criar-conta');
  const criarLoginGoogleBotao = loginContainer.querySelector('#btn-login-google');

  // Função de login
  const firstLogin = (event) => {
    event.preventDefault();
    const email = emailEntrada.value;
    const senha = senhaEntrada.value;
    // Chamada para a função de login
    loginEmail(email, senha)

      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        errorMessage.textContent = 'Informações de e-mail ou senha incorretas. Tente novamente';
        errorMessage.style.display = 'block';
      });
    return false;
  };

  entrarLoginBotao.addEventListener('click', firstLogin);

  //evento para ouvir quando a mensagem estiver começando a ser digitada e limpar campo de erro
    emailEntrada.addEventListener('input', () => {
      errorMessage.textContent = '';
    });
    senhaEntrada.addEventListener('input', () => {
      errorMessage.textContent = '';
    });

  // Login Google
  criarLoginGoogleBotao.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        window.location.hash = '#feed';
      }).catch(() => {
        errorMessage.textContent = 'Não foi possível logar com o Google';
        errorMessage.style.display = 'block';
      });
  });

  criarLoginBotao.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#cadastro';
  });

  return loginContainer;
};
