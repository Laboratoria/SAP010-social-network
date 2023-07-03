//import { } from "../../lib/authUser.js";
//import { loginWithUser } from '../../configFirebase/auth';

export default () => {
  const loginContainer = document.createElement('div');
  const templateLogin = `
  <header>
    <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
  </header>
  <div>
    <h2>Bem vinde a sua rede social de filmes</h2>
  </div>
    <form id="formulário">
      <fieldset>
        <div>
          <label for="usuario">Nome do usuário/E-mail</label>
          <input type="text" class="usuario" id="usuario">
        </div>
        <div>
          <label for="senha">Senha</label>
          <input type="password" class="senha" id="senha">
        </div>
        <button class="btn" id="btn-login-entrar">Entrar</button>
        <button class="btn" id="btn-login-esq-senha">Esqueceu a senha?</button>
        <button class="btn" id="btn-login-google">Login com Google</button>
        <button class="btn" id="btn-login-criar-conta">Não tem login? Crie sua conta agora</button>
      </fieldset>
    </form>
  <footer>
    <h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
    <h6>Desenvolvido por Larissa, Maila e Vitória</h6>
    <p>2023</p>
  </footer>`;

  loginContainer.innerHTML = templateLogin;

  


  // Informações preenchidas pelo usuário
  const usuarioEntrada = loginContainer.querySelector("#usuario");
  const senhaEntrada = loginContainer.querySelector("#senha");

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
