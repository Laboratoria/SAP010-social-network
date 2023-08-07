// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
import home from './pages/home/home';
import cadastro from './pages/cadastro/cadastro';
import login from './pages/login/login';
import feed from './pages/feed/feed';
import senha from './pages/redefinicao-de-senha/senha';
import suporte from './pages/suporte/suporte';
// import { identificarUsuarioConectado } from './lib/firebase';
import { auth } from './lib/firebase-config';

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
        // identificarUsuarioConectado();
        if (auth.currentUser) {
          principal.appendChild(feed());
        } else {
          window.location.hash = '#login';
        }
        break;
      case '#redefinir-senha':
        principal.appendChild(senha());
        break;
      case '#suporte':
        principal.appendChild(suporte());
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
