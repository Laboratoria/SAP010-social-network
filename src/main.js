import { loginUser } from './Login/login.js';
import { registerUser } from './Register/register.js';
import { feedUser } from './Feed/feed.js';

const root = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    root.innerHTML = '';
    switch (window.location.hash) {
      case ' ':
        root.appendChild(loginUser());
        break;
      case '#register':
        root.appendChild(registerUser());
        break;
      case '#feed':
        root.appendChild(feedUser());
        break;
      default:
        root.appendChild(loginUser());
    }
  });
};

window.addEventListener('load', () => {
  root.appendChild(loginUser());
  init();
  // root.appendChild(registerUser());
  // init();
  // root.appendChild(feedUser());
  // init();
});
