// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
import home from './pages/home/home';
import cadastro from './pages/cadastro/cadastro';
import login from './pages/login/login';

const principal = document.querySelector('#principal');

const init = () => {
  window.addEventListener('hashchange', () => {
    principal.innerHTML = '';
    // console.log(window.location.hash);
    switch (window.location.hash) {
      case '':
        principal.appendChild(home());
        break;
      case '#login':
        principal.appendChild(login());
        break;
      default:
        if (window.location.hash.includes('cadastro')) {
          principal.appendChild(cadastro());
        } else {
          principal.appendChild(home());
        }
    }
  });
};

window.addEventListener('load', () => {
  principal.appendChild(home());
  init();
});
