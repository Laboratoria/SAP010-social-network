import './login.css';
// import { login } from '../serviceFirebase/firebaseAuth.js';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';
import google from '../imagens/google.png';
// import facebook from '../imagens/facebook.png';

export default () => {
  const containerLogin = document.createElement('section');
  containerLogin.classList.add('container-login');

  const templateLogin = `
  <img class="img-CBD1" src=${CBD} alt="logo app">
  <div class="container">
  <form class="form-entrar" action="#">
  <input class="input centro" type="email" name="email" id="email" placeholder="E-MAIL" >
  <span id="email-alert" class="input-error"></span>
  <input class="input centro" type="password" name="senha" id="senha" placeholder="SENHA" >
  <a id="btnEntrar" class="entrar centro" href="/#feed">ENTRAR</a>  
  </form>
  <div class="ou-box">
  <span class="ou">OU</span>
  <div class="login-redes">
  <img id="entrarGoogle"class="img-google" src=${google} alt="logo Google">
 
  </div>
  <span id="pass-alert" class="input-error"></span>
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

  containerLogin.innerHTML = templateLogin;

  // const btnLogin = containerLogin.querySelector('#btnEntrar');
  // const emailInput = containerLogin.querySelector('#email');
  // const passInput = containerLogin.querySelector('#senha');
  // const emailAlert = containerLogin.querySelector('#email-alert');
  // const passAlert = containerLogin.querySelector('#pass-alert');
  // const userAlert = containerLogin.querySelector('#user-alert');

  // Adicionar evento de clique no botão para validar os inputs email e senha
  // btnLogin.addEventListener('click', async (e) => {
  //   e.preventDefault();
  //   const email = emailInput.value;
  //   const password = passInput.value;

  //   if (email !== '') {
  //     emailAlert.textContent = '';
  //   } else {
  //     validateEmail();
  //   }
  //   if (password !== '') { // && strongPassword.test(password)
  //     passAlert.textContent = '';
  //   } else {
  //     validatePassword();
  //   }

  //   try {
  //     await logIn(email, password);
  //     if (auth.currentUser) {
  //       window.location.href = '#feed';
  //     } else {
  //       userAlert.textContent = 'Usuário não cadastrado!';
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // });

  // const buttonLogin = containerLogin.querySelector("#btnEntrar");
  // buttonLogin.addEventListener("click", () => {
  //   const email = containerLogin.querySelector("#email");
  //   const senha = containerLogin.querySelector("#senha");
  //   login(email.value, senha.value)
  //     .then(() => {
  //       window.location.hash = "#feed";
  //     })
  //     // eslint-disable-next-line no-unused-vars
  //     .catch((error) => {
  //       // eslint-disable-next-line no-alert
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
  //   });
  return containerLogin;
};

// const entrarGoogle = document.getElementById("entrarGoogle");
/* evento para entrar com a conta google */
// entrarGoogle.addEventListener("click", (e) => {
//   const entrar = e.target.value;
//   console.log(entrar);
// });

// <span id="cadastro" class="texto1 centro">Criar nova conta</span>
