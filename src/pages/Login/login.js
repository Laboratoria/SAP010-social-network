import { login } from "../../lib/authUser.js";
//import { } from '../../configFirebase/auth';

export default () => {
  const loginContainer = document.createElement('div');
  const templateLogin = `<div id="loginBackground"></div><div><header>
  <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
</header>
<div>
  <h2>Bem vinde a sua rede social de filmes</h2>
</div>
<form>
<fieldset>
  <div>
    <label for="">E-mail</label>
    <br>
    <input type="text" class="email" id="email">
  </div>
  <div>
    <label for="">Senha</label>
    <br>
    <input type="password" class="senha" id="senha">
  </div>
  <button class="btn" id="btn-login-entrar">Entrar</button>
  <br>
  <button class="btn btn-transparente" id="btn-login-esq-senha">Esqueceu a senha?</button>
  <br>
  <button class="btn btn-transparente" id="btn-login-google">Login com Google</button>
  <br>
  <button class="btn btn-escuro" id="btn-login-criar-conta">Não tem login? Crie sua conta agora</button>
</fieldset>
</form>
<footer>
<h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
<h6>Desenvolvido por Larissa, Maila e Vitória</h6>
<p>2023</p>
</footer></div>`;

loginContainer.id = "login"
loginContainer.innerHTML = templateLogin;

  // Informações preenchidas pelo usuário
  const emailEntrada = loginContainer.querySelector("#email");
  const senhaEntrada = loginContainer.querySelector("#senha");

  // Botões
  const entrarLoginBotao = loginContainer.querySelector("#btn-login-entrar");
  const criarLoginBotao = loginContainer.querySelector("#btn-login-criar-conta");

  // Função de login
  const firstLogin = (event) => {
    event.preventDefault();
    const email = emailEntrada.value;
    const senha = senhaEntrada.value;

    // Chamada para a função de login
    login(email, senha)
      .then(() => {
        window.location.hash = '#perfil';
      })
      .catch((err) => {
        const errorMessage = loginContainer.querySelector('#errorMessage');
        errorMessage.textContent = 'Usuário ou senha incorretos';
        errorMessage.style.display = 'block';
        console.log(err);
      });
    
    // teste login
    console.log(`Usuário: ${email} Senha: ${senha}`);
  };

  entrarLoginBotao.addEventListener('click', firstLogin);

  criarLoginBotao.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#criarConta';
  });

  return loginContainer;
};
