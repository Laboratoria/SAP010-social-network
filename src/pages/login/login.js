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
<input type="email" id="input-email-login" name="email" placeholder="Email" autocomplete="off">
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

  const checkBtn = container.querySelector("#check");

  function mostrarSenha() {
    if (checkBtn.checked) {
      inputSenha.type = "text";
    } else {
      inputSenha.type = "password";
    }
  }

  checkBtn.addEventListener("change", mostrarSenha);

  botaoEntrar.addEventListener('click', (event) => {

    event.preventDefault();
    const emailDoUsuario = inputEmail.value;
    const senhaDoUsuario = inputSenha.value;
    
    loginUsuario(emailDoUsuario, senhaDoUsuario)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('usuário logado com sucesso')
        console.log(user)
        window.location.hash = '#feed'
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`)
        if (errorCode === "auth/invalid-email") {
          alert("Email inválido.")
        }
        else if (errorCode === "auth/missing-password") {
          alert("Por favor, insira sua senha.")
        }
        else if (errorCode === "auth/wrong-password") {
          alert("Senha incorreta. Tente novamente.")
        }
        else {
          alert("Você ainda não tem uma conta. Cadastre-se.")
        }
      });
  })

  return container;
};
