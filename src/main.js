import { loginUser } from './Login/login.js';
import { registerUser } from './Register/register.js';
import { feedUser } from './Feed/feed.js';
import { aboutUs } from './Sobre/sobre.js';
import { authStateChanged, logout } from './lib/index.js';

const root = document.querySelector('#root');

const isLoggedIn = () => {
  const token = window.localStorage.getItem('token');
  return Boolean(token);
};

export const routes = () => {
  root.innerHTML = '';

  if (isLoggedIn()) {
    const hash = window.location.hash;
    switch (hash) {
      case '':
      case '#feed':
        root.appendChild(feedUser());
        break;
      case '#sair':
        logout();
        break;
      case '#sobre':
        root.appendChild(aboutUs());
        break;
      default:
        root.appendChild(feedUser());
        break;
    }
    return;
  }
  switch (window.location.hash) {
    case '':
    case '#login':
      root.appendChild(loginUser());
      break;
    case '#register':
      root.appendChild(registerUser());
      break;
    default:
      root.appendChild(loginUser());
  }
};

const init = () => {
  window.addEventListener('hashchange', routes);
};

authStateChanged((user) => {
  if (user) {
    window.localStorage.setItem('token', 'aaa');
  } else {
    window.localStorage.removeItem('token');
  }

  routes();
});

window.addEventListener('load', () => {
  const loadingElement = document.createElement('h1');
  loadingElement.classList.add('loadPages');
  loadingElement.textContent = 'Carregando aguarde...';
  root.appendChild(loadingElement);
  init();
});
