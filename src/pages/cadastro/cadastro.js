import { cadastrarUsuario } from "../../lib/firebase";

export default () => {
  const container = document.createElement('div');
  container.id = 'csscadastro';

  const template = `<picture id="picture-cadastro">
  <nav><a href=""><img src="imagens/icon-voltar-branco.png"></a></nav>
<img src="imagens/menina.png" alt="menina fazendo movimento de arte marcial" id="menina-cadastro">
</picture>
<form id="formulario-cadastro" autocomplete="off">
<header><h1>CADASTRE-SE</h1>
<picture>
<img src="imagens/fightback-logo.png" alt="logo do app">
</picture>
</header>
<input type="text" id="input-name" name="name" placeholder="Nome">
<input type="email" id="input-email-cadastro" name="email" placeholder="Email">
<div class="cadastro-check">
  <input type="checkbox" id="check-cadastro" class="onoff">
  <label for="check-cadastro" class="check-btncadastro"></label>
  <input type="password" id="input-senha-cadastro" name="senha" placeholder="Senha">
</div>
<button id="btn-vermelho">Cadastrar</button>
<p id="paragrafo-cadastro">Já tem uma conta?&nbsp;<a href="/#login">Entrar</a></p>
</form>`;

  container.innerHTML = template;


  const botaoCadastrar = container.querySelector('#btn-vermelho');
  const inputEmail = container.querySelector("#input-email-cadastro");
  const inputSenha = container.querySelector("#input-senha-cadastro");

  botaoCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    const emailDoUsuario = inputEmail.value;
    const senhaDoUsuario = inputSenha.value;

    cadastrarUsuario(emailDoUsuario, senhaDoUsuario)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('usuário cadastrado com sucesso')
        console.log(user)
        alert("Cadastro realizado com sucesso! Faça o login.")
        window.location.hash = '#login'
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`)
        alert("Usuário já cadastrado. Tente outro email.")
      });
  })



  return container;
};

// const inputEmail = document.querySelector("#input-email");
// const inputSenha = document.querySelector("#input-senha");
