import login from "./pages/Login/login.js";
import perfil from "./pages/Perfil/perfil.js";
import cadastro from "./pages/Cadastro/cadastro.js";


document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector("#root");

  const init = () => {
    window.addEventListener("hashchange", () => {
      main.innerHTML = '';
      switch (window.location.hash) {
        case '':
          main.appendChild(login());
          break;
        case '#criarConta':
          main.appendChild(cadastro());
          break;
        case '#perfil':
          main.appendChild(perfil());
          break;
        case '#voltar':
          main.appendChild(login());
          break;
        case '#concluir':
          main.appendChild(login());
          break;
        default:
          main.appendChild(login());
      }
    });
  };

  window.addEventListener('load', () => {
    main.appendChild(login());
    init();
  });
});