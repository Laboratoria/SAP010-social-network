import login from "./pages/Login/login.js";
import perfil from "./pages/Perfil/perfil.js";
import cadastro from "./pages/Cadastro/cadastro.js";
import feed from "./pages/Feed/feed.js";

  const main = document.querySelector("#root");

  const init = () => {
    window.addEventListener("hashchange", () => {
      main.innerHTML = '';
      switch (window.location.hash) {
        case '':
          main.appendChild(login());
          break;
        case '#login':
          main.appendChild(login());
          break;
        case '#cadastro':
          main.appendChild(cadastro());
          break;
        case '#perfil':
          main.appendChild(perfil());
          break;
        case '#feed':
          main.appendChild(feed());
          break;
          /*         case '#concluir':
          main.appendChild(feed());
          break; */
        default:
          main.appendChild(login());
      }
    });
  };

  window.addEventListener('load', () => {
    main.appendChild(login());
    init();
  });

//incluir validação para redirecionamento da pagina (main) video palomita