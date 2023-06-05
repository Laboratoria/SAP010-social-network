import home from './view/homee/home.js';
import login from './view/login/login.js';
import register from './view/register/register.js';
import feed from './view/feed/feed.js';
import { isUserLoggedIn } from './firebase/firebase.js';

const main = document.querySelector('#main');

const changeScreen = async () => {
  main.innerHTML = '';
  const user = await isUserLoggedIn();

  if (user) {
    switch (window.location.hash) {
      case '':
        main.appendChild(home());
        break;
      case '#home':
        window.location.hash = '#feed';
        main.appendChild(feed());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      default:
        window.location.hash = '#home';
        main.appendChild(home());
    }
  } else {
    switch (window.location.hash) {
      case '':
        main.appendChild(home());
        break;
      case '#home':
        main.appendChild(home());
        break;
      case '#login':
        main.appendChild(login());
        break;
      case '#register':
        main.appendChild(register());
        break;
      default:
        window.location.hash = '#home';
        main.appendChild(home());
    }
  }
};

window.addEventListener('load', () => {
  changeScreen();
});

window.addEventListener('hashchange', changeScreen);
