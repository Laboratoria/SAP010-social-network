import home from './view/homee/home.js';
import login from './view/login/login.js';
import register from './view/register/register.js';
import feed from './view/feed/feed.js';
import { isUserLoggedIn } from './firebase/firebase.js';

const main = document.querySelector('#main');

const changeScreen = async () => {
  main.innerHTML = '';

  switch (window.location.hash) {
    case '':
      main.appendChild(home());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#feed':
      {
        const user = await isUserLoggedIn();
        if (user) {
          main.appendChild(feed());
        } else {
          window.location.hash = '#login';
        }
      }
      break;
    default:
      main.appendChild(home());
  }
};

window.addEventListener('load', () => {
  changeScreen();
});

window.addEventListener('hashchange', changeScreen);
