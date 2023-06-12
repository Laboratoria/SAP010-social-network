import { login } from './pages/login/login.js';
import register from './pages/register/register';
//import homepage from './pages/homepage/homepage.js';

const main = document.querySelector('#root');

//renderPage é chamado toda vez que tem uma troca de # (window.location.hash), ou seja, muda o final da url
const renderPage = () => {
  main.innerHTML = '';
  const hash = window.location.hash;

  switch (hash) {
    case '#register':
      main.appendChild(register());
      break;
    case '#homepage':
      main.appendChild(homepage());
      break;
    default:
      main.appendChild(login());
      break;
  }
};

//adiciona um callback no evento hashchange
window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  if (window.location.hash === '#register') {
    main.appendChild(register());
  } else if (window.location.hash === '#homepage') {
    main.appendChild(feed());
  } else {
    main.appendChild(login());
  }
});
