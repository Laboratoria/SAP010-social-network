//import { } from "../../lib/authUser.js";
//import { loginWithUser } from '../../configFirebase/auth';

export default () => {
  const loginContainer = document.createElement('div');

  // Informações preenchidas pelo usuário
  const usuarioEntrada = loginContainer.querySelector("#usuario");
  const senhaEntrada = loginContainer.querySelector("#senha");
const login = document.createElement('div');
const templateLogin = `<form>
<fieldset>
  <div>
    <label for="">Nome do usuário/E-mail</label>
    <br>
    <input type="text" class="usuario" id="usuario">
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
</form>`;

loginContainer.innerHTML = templateLogin;

  // Botões
  const entrarLoginBotao = loginContainer.querySelector("#btn-login-entrar");
  const criarLoginBotao = loginContainer.querySelector("#btn-login-criar-conta");

  entrarLoginBotao.addEventListener("click", () => {
    window.location.hash = "#entrarLogin";
  });

  criarLoginBotao.addEventListener("click", () => {
    window.location.hash = "#criarConta";
  });

  // Função de login
  const firstLogin = () => {
    const usuario = usuarioEntrada.value;
    const senha = senhaEntrada.value;

    // Chamada para a função de login
    // loginWithUser(usuario, senha)
    //   .then(() => {
    //     window.location.hash = '#root';
    //   })
    //   .catch(() => {
    //     const errorMessage = loginContainer.querySelector('#errorMessage');
    //     errorMessage.textContent = 'Usuário ou senha incorretos';
    //     errorMessage.style.display = 'block';
    //   });
    
    // teste login
    console.log(`Usuário: ${usuario} Senha: ${senha}`);
  };

  entrarLoginBotao.addEventListener('click', firstLogin);

  criarLoginBotao.addEventListener('click', () => {
    window.location.hash = '#criarConta';
  });

  return loginContainer;
};
