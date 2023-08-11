import meninalogin from '../../imagens/menina.png';
import iconvoltar from '../../imagens/icon-voltar.png';
import logo from '../../imagens/fightback-logo.png';
import { loginUsuario } from '../../lib/firebase';
// lerDadosTeste, teste
export default () => {
  const container = document.createElement('div');
  container.id = 'csslogin';

  const template = `
  <picture id="picture-login">
  <nav><a href=""><img src="${iconvoltar}" class="voltar"></a></nav>
  <img src="${meninalogin}" alt="menina fazendo movimento de arte marcial" id="menina-login">
  </picture>
  <form id="formulario-login">
  <header><h1>ENTRAR</h1>
<picture>
<img src="${logo}" alt="logo do app" class="logo">
</picture>
</header>
<input type="email" id="input-email-login" name="email" placeholder="Email" autocomplete="off">
<div class="senha-check">
<input type="checkbox" id="check" class="on-off">
 <label for="check" class="check-btn"></label>
 <input type="password" id="input-senha-login" name="senha" placeholder="Senha">
 </div>
 <div id="mensagemErro"></div>
<button id="btn-cinza-login">Entrar</button>
<button id="redefinir-senha" href="/#redefinir-senha">Esqueceu sua senha?</button>

<p id="paragrafo-login">Ainda não tem uma conta??&nbsp;<a href="/#cadastro">Cadastre-se</a></p>
  </form>`;

  container.innerHTML = template;

  const botaoEntrar = container.querySelector('#btn-cinza-login');
  const inputEmail = container.querySelector('#input-email-login');
  const inputSenha = container.querySelector('#input-senha-login');
  const btnRedefSenha = container.querySelector('#redefinir-senha');
  const checkBtn = container.querySelector('#check');

  function mostrarSenha() {
    if (checkBtn.checked) {
      inputSenha.type = 'text';
    } else {
      inputSenha.type = 'password';
    }
  }
  const mensagemFormatada = document.createElement('p');
  checkBtn.addEventListener('change', mostrarSenha);

  btnRedefSenha.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#redefinir-senha';
  });

  botaoEntrar.addEventListener('click', (event) => {
    event.preventDefault();
    const emailDoUsuario = inputEmail.value;
    const senhaDoUsuario = inputSenha.value;

    function exibirErro(errorCode) {
      const mensagemErroDiv = document.getElementById('mensagemErro');
      mensagemFormatada.textContent = `${errorCode}`;
      mensagemErroDiv.appendChild(mensagemFormatada);
    }

    loginUsuario(emailDoUsuario, senhaDoUsuario)

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`);
        if (errorCode === 'auth/invalid-email') {
          exibirErro('Email inválido. Verifique o campo e tente novamente.');
        } else if (errorCode === 'auth/missing-password') {
          exibirErro('Por favor, insira sua senha.');
        } else if (errorCode === 'auth/wrong-password') {
          exibirErro('Senha incorreta. Tente novamente.');
        } else {
          exibirErro('Você ainda não tem uma conta. Cadastre-se.');
        }
      })

      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.location.hash = '#feed';
        // teste();
        // lerDadosTeste();
      });
  });

  return container;
};
