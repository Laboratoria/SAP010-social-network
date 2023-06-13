import { login } from './view/home/login.js';
import { cadastro } from './view/home/cadastro.js';
import { home } from './view/home/home.js';
import { feed } from './view/feed/feed.js';

const main = document.querySelector('#main');
const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#home':
        main.appendChild(home());
        break;
      case '#login':
        main.appendChild(login());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;
      case '#feed':
        // verificar se está conectado
        main.appendChild(feed());
        break;
      default:
        main.appendChild(home());
        break;
    }
  });
};

window.addEventListener('load', () => {
  window.location.hash = '#home';
  main.appendChild(home());
  init();
});
