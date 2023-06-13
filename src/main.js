import { getLoginPage } from './pages/login/login.js';
import register from './pages/register/register';
import { showFeed } from './pages/feed/feed.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fireBase/firebaseConfig.js';
const main = document.querySelector('#root');

const renderPage = () => {
  main.innerHTML = '';
  const hash = window.location.hash;

  switch (hash) {
    case '#register':
      main.appendChild(register());
      break;
    case '#homepage':
      showFeed().then(feedElement => {
        main.appendChild(feedElement);
      });
      break;
    default:
      main.appendChild(getLoginPage());
      break;
  }
};

window.addEventListener('hashchange', renderPage);

window.addEventListener('load', () => {
  if (window.location.hash === '#register') {
    main.appendChild(register());
  } else if (window.location.hash === '#homepage') {
    showFeed().then(feedElement => {
      main.appendChild(feedElement);
    });
  } else {
    main.appendChild(getLoginPage());
  }
});

onAuthStateChanged(auth, user => {
  if (user) {
    window.location.hash = '#homepage'; // Redireciona para a página de feed
  } else {
    window.location.hash = ''; // Redireciona para a página de login
  }
});
