import './login.css';
import { login, loginGoogle } from '../serviceFirebase/firebaseAuth';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';
import google from '../imagens/google.png';

// import facebook from '../imagens/facebook.png';

export default () => {
  const containerLogin = document.createElement('section');
  containerLogin.classList.add('container-login');

  const templateLogin = `
  <img class="img-CBD1" src=${CBD} alt="logo app">
  <div class="container">
  <form class="form-entrar">
  <input class="input centro" type="email" name="email" id="email" placeholder="E-MAIL" >
  <span id="email-alert" class="input-error"></span>
  <input class="input centro" type="password" name="senha" id="senha" placeholder="SENHA" >
  <span id="pass-alert" class="erroLogin"></span>
  <button type="submit" id="btnEntrar" class="entrar centro" >ENTRAR</button>
  <p class="erroLogin" id="loginErro"></p>
  </form>
  <div class="ou-box">
  <span class="ou">OU</span>
  <div class="login-redes">
  <img id="entrarGoogle"class="img-google" src=${google} alt="logo Google">
 
  </div>
  
  <span id="user-alert" class="input-error"></span>
  <span class="texto1 centro">Ainda não tem conta?</span>
  <nav>
  <a href="#cadastro" id="cadastro" class="texto1 centro">Criar nova conta</a>
  </nav>
  
  </div>
  </div>`;

  // <img class="img-facebook" src=${facebook} alt="logo Facebook">
  /* <button id="btnEntrar" type="submit" class="entrar centro">
  ENTRAR
</button>; */
  // <a id="btnEntrar" class="entrar centro" href="/#feed">ENTRAR</a>

  containerLogin.innerHTML = templateLogin;

  const btnLogin = containerLogin.querySelector('#btnEntrar');
  const email = containerLogin.querySelector('#email');
  const senha = containerLogin.querySelector('#senha');
  const btnGoogle = containerLogin.querySelector('#entrarGoogle');
  const mensagemErroLogin = containerLogin.querySelector('#loginErro');
  const mensagemErroSenha = containerLogin.querySelector('#pass-alert');

  // Adicionar evento de clique no botão para validar os inputs email e senha
  btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    if (email.value === '') {
      mensagemErroLogin.innerHTML = 'Preencha o campo email!';
      return;
    }
    if (senha.value === '') {
      mensagemErroLogin.innerHTML = 'Preencha o campo senha!';
      return;
    }

    senha.addEventListener('input', () => {
      mensagemErroSenha.innerHTML = ''; // Limpa a mensagem de erro
      senha.classList.remove('borda-vermelha'); // Remove a classe 'borda-vermelha'
    });

    login(email.value, senha.value)
      .then((user) => {
        window.location.hash = '#feed';
        console.log(user);
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          mensagemErroSenha.innerHTML = 'Senha incorreta!';
          senha.classList.add('borda-vermelha');
        } else {
          mensagemErroSenha.innerHTML = error.message;
          mensagemErroSenha.hidden = true;
          senha.classList.remove('borda-vermelha'); // Exibe a mensagem de erro padrão
        }

        console.log('Erro ao fazer o login:', error);
      });
  });

  // auth / invalid - email - Precisamos tratar este erro aqui tbm

  btnGoogle.addEventListener('click', async () => {
    loginGoogle().then((user) => {
      window.location.hash = '#feed';
      console.log(user);
    })
      .catch((error) => {
        console.log('Erro ao fazer o login:', error);
      });
    console.log('loginGoogle');
  });

  return containerLogin;
};

// const passAlert = containerLogin.querySelector('#pass-alert');

// function validarSenha() {
//   const passInputValue = senha.value;
//   if (!passInputValue) {
//     passAlert.textContent = 'Senha inválida';
//   };
// const buttonLogin = containerLogin.querySelector("#btnEntrar");
// buttonLogin.addEventListener("click", () => {
//   const email = containerLogin.querySelector("#email");
//   const senha = containerLogin.querySelector("#senha");
//   login(email.value, senha.value)
//     .then(() => {
//       window.location.hash = "#feed";
//     })

//     .catch((error) => {

//       if (error.message === "Firebase: Error (auth/user-not-found).") {
//         alert("Usuário não encontrado");
//       } else if (error.message === "Firebase: Error (auth/wrong-password).") {
//         alert("Senha incorreta");
//       }
//     });
// });

// const btnEntrar = containerLogin.querySelector("#btnEntrar");
// window.onload = function () {
//   btnEntrar.addEventListener("click", () => {
//     const email = containerLogin.querySelector("#email");
//     const senha = containerLogin.querySelector("#senha");
//     login(email.value, senha.value)
//       .then(() => {
//         window.location.hash = "#feed";
//       })
//       .catch((error) => {
//         if (error.message === "Firebase: Error (auth/user-not-found).") {
//           alert("Usuário não encontrado.");
//         } else if (
//           error.message === "Firebase: Error (auth/wrong-password)."
//         ) {
//           alert("Senha incorreta");
//         }
//         // console.log("");
//       });
// });

// const entrarGoogle = document.getElementById("entrarGoogle");
/* evento para entrar com a conta google */
// entrarGoogle.addEventListener("click", (e) => {
//   const entrar = e.target.value;
//   console.log(entrar);
// });

// <span id="cadastro" class="texto1 centro">Criar nova conta</span>
