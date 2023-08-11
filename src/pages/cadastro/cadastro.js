import meninacadastro from '../../imagens/menina.png';
import iconvoltar from '../../imagens/icon-voltar-branco.png';
import logo from '../../imagens/fightback-logo.png';
import { cadastrarUsuario, atualizarNomeDoUsuario } from '../../lib/firebase';

export default () => {
  const container = document.createElement('div');
  container.id = 'csscadastro';

  const template = `<picture id="picture-cadastro">
  <nav><a href=""><img src="${iconvoltar}" class="voltar"></a></nav>
<img src="${meninacadastro}" alt="menina fazendo movimento de arte marcial" id="menina-cadastro">
</picture>
<form id="formulario-cadastro" autocomplete="off">
<dialog id="caixaDeTexto">
  <p>Usuario cadastrado com sucesso!</p>
</dialog>
<header><h1>CADASTRE-SE</h1>
<picture>
<img src="${logo}" alt="logo do app" class="logo">
</picture>
</header>
<input type="text" id="input-name" name="name" placeholder="Nome" autocomplete="off">
<input type="email" id="input-email-cadastro" name="email" placeholder="Email" autocomplete="off">
<div class="cadastro-check">
  <input type="checkbox" id="check-cadastro" class="onoff">
  <label for="check-cadastro" class="check-btncadastro"></label>
  <input type="password" id="input-senha-cadastro" name="senha" placeholder="Senha">
</div>
<div id="mensagemErro"></div>
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
  const mensagemFormatada = document.createElement('p');
  checkBtn.addEventListener('change', mostrarSenha);

  botaoCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    const emailDoUsuario = inputEmail.value;
    const senhaDoUsuario = inputSenha.value;
    const nomeDoUsuario = inputNome.value;
    const caixaDeTexto = container.querySelector('#caixaDeTexto');

    function exibirErro(errorCode) {
      const mensagemErroDiv = document.getElementById('mensagemErro');
      mensagemFormatada.textContent = `${errorCode}`;
      mensagemErroDiv.appendChild(mensagemFormatada);
    }

    if (nomeDoUsuario === '') {
      exibirErro('Por favor, insira seu nome.');
    } else {
      cadastrarUsuario(emailDoUsuario, senhaDoUsuario)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('Cadastrado realizado com sucesso!');
          console.log(user);
          caixaDeTexto.show();

          atualizarNomeDoUsuario(nomeDoUsuario)
            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(`${errorCode} - ${errorMessage}`);
            });
          function mostrarFeed() {
            window.location.hash = '#feed';
          }
          setTimeout(mostrarFeed, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`${errorCode} - ${errorMessage}`);
          if (errorCode === 'auth/invalid-email') {
            exibirErro('Email inválido. Verifique o campo e tente novamente.');
          } else if (errorCode === 'auth/missing-password') {
            exibirErro('Por favor, insira sua senha.');
          } else if (errorCode === 'auth/weak-password') {
            exibirErro('Sua senha deve ter no mínimo 6 dígitos.');
          } else if (errorCode === 'auth/email-already-in-use') {
            exibirErro('Usuário já cadastrado. Tente outro email.');
          }
        });
    }
  });

  return container;
};
