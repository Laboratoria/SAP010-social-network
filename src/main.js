import { loginUser } from './Login/login.js';
import { registerUser } from './Register/register.js';
import { feedUser } from './Feed/feed.js';

const root = document.querySelector('#root');

const isLoggedIn = () => {
  const token = window.localStorage.getItem('token');
  return Boolean(token);
};

export const routes = () => {
  root.innerHTML = '';

  if (isLoggedIn()) {
    switch (window.location.hash) {
      case '':
      case '#feed':
        root.appendChild(feedUser());
        break;
      default:
        root.appendChild(feedUser());
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


window.addEventListener('load', () => {
  root.appendChild('<h1>Carregando...</h1>');
  init();
  // root.appendChild(registerUser());
  // init();
  // root.appendChild(feedUser());
  // init();
});

