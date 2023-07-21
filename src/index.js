import login from './pages/Login/login.js';
import cadastro from './pages/Cadastro/cadastro.js';
import feed from './pages/Feed/feed.js';
import { userAuthCheck } from './lib/authUser.js';
const main = document.querySelector('#root');
const init = async () => {
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
      case '#feed': {
        await verificarLogin();
        break;
      }
      default:
        main.appendChild(login());
    }
  });
};
window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});

window.addEventListener('feed', ()  => {
  setTimeout(verificarLogin, 2000);
});
//setTimeout(verificarLogin, 2000);

async function verificarLogin() {
  return userAuthCheck((userLogged) => {
    main.innerHTML = '';
    console.log({ userLogged });
    if (userLogged && userLogged.email) {
      main.appendChild(feed());
    } else {
      window.location.hash = '#login';
      main.appendChild(login());
    }
    init();
  });
}
window.addEventListener('load', async () => {
  verificarLogin();
});






