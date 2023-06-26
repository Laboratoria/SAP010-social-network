import login from "./pages/Login/login.js";
import perfil from "./pages/Perfil/perfil.js";
import cadastro from "./pages/Cadastro/cadastro.js";

const main = document.querySelector("root");
const init = () => {
  window.addEventListener("hashchange", () => {
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
      };
  })
} 

window.addEventListener("load", () => {
  main.appendChild(login());
  init();
})