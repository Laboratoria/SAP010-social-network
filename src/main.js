// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
import home from './pages/home/home';
import cadastro from './pages/cadastro/cadastro';
import login from './pages/login/login';
import feed from './pages/feed/feed';

const principal = document.querySelector('#principal');

const init = () => {
  window.addEventListener('hashchange', () => {
    principal.innerHTML = '';
    switch (window.location.hash) {
      case '':
        principal.appendChild(home());
        break;
      case '#login':
        principal.appendChild(login());
        break;
      case '#cadastro':
        principal.appendChild(cadastro());
        break;
      case '#feed':
        principal.appendChild(feed());
        break;
      default:
        principal.appendChild(home());
        break;
    }
  });
};



window.addEventListener('load', () => {
  principal.appendChild(home());
  init();
});
