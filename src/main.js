import login from './pages/login/login.js';
import register from './pages/register/register.js';
import timeline from './pages/timeline/timeline.js';
import { checkLoggedUser } from './firebase/auth.js';

const main = document.querySelector('#root');
const init = async () => {
  window.addEventListener('hashchange', async () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#login':
        main.appendChild(login());
        break;
      case '#register':
        main.appendChild(register());
        break;
      case '#timeline': {
        const userLoggedIn = await checkLoggedUser();
        if (userLoggedIn) {
          main.appendChild(timeline());
        } else {
          alert('Realize o login');
          main.appendChild(login());
        }
        break;
      }
      default:
        main.appendChild(login());
        break;
    }
  });
};

window.addEventListener('load', async () => {
  const userLoggedIn = await checkLoggedUser();
  if (userLoggedIn) {
    main.appendChild(timeline());
  } else {
    window.location.hash = '#login';
    main.appendChild(login());
  }
  init();
});

export const navigate = (hash) => {
  window.location.hash = hash;
};
