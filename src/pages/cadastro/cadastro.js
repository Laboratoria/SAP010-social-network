import { cadastrarUsuario } from "../../lib/firebase";

export default () => {
  const container = document.createElement('div');
  container.id = 'csscadastro';

  const template = `<picture id="picture-cadastro">
<img src="imagens/menina.png" alt="menina fazendo movimento de arte marcial" id="menina-cadastro">
</picture>
<form id="formulario-cadastro" autocomplete="off">
<header><h1>CADASTRE-SE</h1>
<picture>
<img src="imagens/fightback-logo.png" alt="logo do app">
</picture>
</header>
<input type="text" id="input-name" name="name" placeholder="Nome">
<input type="email" id="input-email" name="email" placeholder="Email">
<div class="cadastro-check">
  <input type="checkbox" id="check-cadastro" class="onoff">
  <label for="check-cadastro" class="check-btncadastro"></label>
  <input type="password" id="input-senha" name="senha" placeholder="Senha">
</div>
<button id="btn-vermelho">Cadastrar</button>
<p id="paragrafo-cadastro">Já tem uma conta?&nbsp;<a href="/#login">Entrar</a></p>
</form>`;

  container.innerHTML = template;

  return container;
};

// const inputEmail = document.querySelector("#input-email");
// const inputSenha = document.querySelector("#input-senha");
