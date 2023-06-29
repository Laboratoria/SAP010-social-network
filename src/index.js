import login from "./pages/Login/login.js";
import perfil from "./pages/Perfil/perfil.js";
import cadastro from "./pages/Cadastro/cadastro.js";

const main = document.querySelector("#root");
const init = () => {
  
  window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    switch(window.location.hash){
      case "#criarConta":
        main.appendChild(cadastro());
        break;
      case "#entrarLogin":
        main.appendChild(perfil());
        break;
      case "#voltar":
        main.appendChild(login());
        break;
      case "#concluir":
        main.appendChild(login());
        break;
      };
  })
} 

window.addEventListener("load", () => {
  main.appendChild(login());
  init();
})

const entrarLogin = document.getElementById("btn-login-entrar");
//const esqSenhaLogin = document.getElementById("btn-login-esq-senha");
//const logGoogleLogin = document.getElementById("btn-login-google");
const criarSenhaLogin = document.getElementById("btn-login-criar-conta");

entrarLogin.addEventListener("click", () => {
  (window.location.hash) === "#entrarLogin";
});
  


criarSenhaLogin.addEventListener("click", () => {
  (window.location.hash) === "#criarConta";
});
  


const voltarCadastro = document.getElementById("btn-cad-voltar");
const concluirCadastro = document.getElementById("btn-cad-concluir");
//const logGoogleCadastro = document.getElementById("btn-cad-login-google");

voltarCadastro.addEventListener("click", () => {
  (window.location.hash) === "#voltar";
});
  

concluirCadastro.addEventListener("click", () => {
  (window.location.hash) === "#concluir";
});
  



