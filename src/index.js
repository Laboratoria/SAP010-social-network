import login from './pages/Login/login.js';
import cadastro from './pages/Cadastro/cadastro.js';
import feed from './pages/Feed/feed.js';
//import { userAuthCheck } from '../src/lib/authUser.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', async () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
      case '#login':
        main.appendChild(login());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
/*       case '#feed':{
          const userLogged = await userAuthCheck();
          if (userLogged) {
            main.appendChild(feed());
          } else {
            alert('Realize o login');
            window.location.hash = '#login';
            main.appendChild(login());
          }
          break;
        } */
      default:
        main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});

/* window.addEventListener('load', async () => {
  const userLogged = await userAuthCheck();
  if (userLogged) {
    main.appendChild(feed());
  } else {
    window.location.hash = '#login';
    main.appendChild(login());
  }
  init();
});
 */

// incluir validação para redirecionamento da pagina (main) video palomita
