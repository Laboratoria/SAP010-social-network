import { login } from './home/login.js';
import { cadastro } from './home/cadastro.js';
import { home } from './home/home.js';
import { feed } from './feed/feed.js';
import { checkLogin } from '../lib/index.js';

const main = document.querySelector('#main');
const init = async () => {
  window.addEventListener('hashchange', async () => {
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
      case '#feed': {
        const userLoggedIn = await checkLogin();
        if (userLoggedIn) {
          main.appendChild(feed());
        } else {
          alert('realize o login');
          main.appendChild(home());
        }
        break;
      }
      default:
        main.appendChild(home());
        break;
    }
  });
};

window.addEventListener('load', async () => {
  const userLoggedIn = await checkLogin();
  if (userLoggedIn) {
    main.appendChild(feed());
  } else {
    window.location.hash = '#home';
    main.appendChild(home());
  }
  init();
});
