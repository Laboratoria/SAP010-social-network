import { login } from './pages/login/login.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = ' ';

    switch (window.location.hash) {
      default:
        main.appendChild(login());
        break;
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});
