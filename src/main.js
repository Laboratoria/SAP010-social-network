import login from './pages/login/login.js';
import register from './pages/register/register';
//import feed from './pages/feed/feed.js';

const main = document.querySelector('#root');

const renderPage = () => {
  main.innerHTML = '';
  const hash = window.location.hash;

  switch (hash) {
    case '#register':
      main.appendChild(register());
      break;
    case '#feed':
      main.appendChild(feed());
      break;
    default:
      main.appendChild(login());
      break;
  }
};

window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  if (window.location.hash === '#register') {
    main.appendChild(register());
  } else if (window.location.hash === '#feed') {
    main.appendChild(feed());
  } else {
    main.appendChild(login());
  }
});
