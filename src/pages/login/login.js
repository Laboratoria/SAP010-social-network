import { loginUsuario } from "../../lib/firebase";

export default () => {
  const container = document.createElement('div');
  container.id = 'csslogin';

  const template = `
  <picture id="picture-login">
  <nav><a href=""><img src="imagens/icon-voltar.png"></a></nav>
  <img src="imagens/menina.png" alt="menina fazendo movimento de arte marcial" id="menina-login">
  </picture>
  <form id="formulario-login">
  <header><h1>ENTRAR</h1>
<picture>
<img src="imagens/fightback-logo.png" alt="logo do app">
</picture>
</header>
<input type="email" id="input-email-login" name="email" placeholder="Email">
<div class="senha-check">
<input type="checkbox" id="check" class="on-off">
 <label for="check" class="check-btn"></label>
 <input type="password" id="input-senha-login" name="senha" placeholder="Senha">
 </div>
<button id="btn-cinza-login">Entrar</button>

<p id="paragrafo-login">Ainda não tem uma conta??&nbsp;<a href="/#cadastro">Cadastre-se</a></p>
  </form>`;

  container.innerHTML = template;

  const botaoEntrar = container.querySelector('#btn-cinza-login');
  const inputEmail = container.querySelector("#input-email-login");
  const inputSenha = container.querySelector("#input-senha-login");

  botaoEntrar.addEventListener('click', (event) => {
    event.preventDefault();
    const emailDoUsuario = inputEmail.value;
    const senhaDoUsuario = inputSenha.value;
    loginUsuario(emailDoUsuario, senhaDoUsuario);
  })

  return container;
};
