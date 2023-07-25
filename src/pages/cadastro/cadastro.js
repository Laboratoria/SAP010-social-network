import { cadastrarUsuario, atualizarNomeDoUsuario } from '../../lib/firebase';

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
<input type="text" id="input-name" name="name" placeholder="Nome" autocomplete="off">
<input type="email" id="input-email-cadastro" name="email" placeholder="Email" autocomplete="off">
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
  const inputEmail = container.querySelector('#input-email-cadastro');
  const inputSenha = container.querySelector('#input-senha-cadastro');
  const inputNome = container.querySelector('#input-name');

  const checkBtn = container.querySelector('#check-cadastro');

  function mostrarSenha() {
    if (checkBtn.checked) {
      inputSenha.type = 'text';
    } else {
      inputSenha.type = 'password';
    }
  }

  checkBtn.addEventListener('change', mostrarSenha);

  botaoCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    const emailDoUsuario = inputEmail.value;
    const senhaDoUsuario = inputSenha.value;
    const nomeDoUsuario = inputNome.value;

    cadastrarUsuario(emailDoUsuario, senhaDoUsuario)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('usuário cadastrado com sucesso');
        console.log(user);
        alert('Cadastro realizado com sucesso!');

        atualizarNomeDoUsuario(nomeDoUsuario)
          .catch((error) => {
            // An error occurred
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`${errorCode} - ${errorMessage}`);
          });

        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`);
        if (nomeDoUsuario === '') {
          alert('Por favor, insira seu nome.');
        } else if (emailDoUsuario === '') {
          alert('Por favor, insira um email.');
        } else if (senhaDoUsuario === '') {
          alert('Por favor, insira uma senha.');
        } else {
          alert('Usuário já cadastrado. Tente outro email.');
        }
      });
  });

  return container;
};

// const inputEmail = document.querySelector("#input-email");
// const inputSenha = document.querySelector("#input-senha");
