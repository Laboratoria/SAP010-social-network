import { getLoginPage } from './pages/login/login.js';
import register from './pages/register/register';
import feed from './pages/feed/feed.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './fireBase/firebaseConfig.js';

document.addEventListener('DOMContentLoaded', async () => {

const main = document.querySelector('#root');

// função render preenche a main que está vazia no html
const renderPage = () => {
  main.innerHTML = '';
  const hash = window.location.hash;

  switch (hash) {
    case '#register':
      main.appendChild(register());
      break;
    case '#homepage':
      //verificar uma forma de identificar se está logado ou não. existe função firebase para isso?
      main.appendChild(feed());
    
      break;
    default:
      main.appendChild(getLoginPage());
      break;
  }
};

// hashchange escuta o evento de mudança de hash que chama o renderPage carrega a página que está a hash
window.addEventListener('hashchange', renderPage);

// escuta o evento da primeira vez que carrega a página e executa o renderPage para saber qual página vai carregar
window.addEventListener('load', renderPage);

// evento acima traz a função de load e render que faz a msm coisa do evento abaixo de forma resumida. Se concordarem podemos apagar
/*window.addEventListener('load', () => {
  if (window.location.hash === '#register') {
    main.appendChild(register());
  } else if (window.location.hash === '#homepage') {
    showFeed().then(feedElement => {
      main.appendChild(feedElement);
    });
  } else {
    main.appendChild(getLoginPage());
  }
});*/ 

/*onAuthStateChanged(auth, user => {
  if (user) {
    window.location.hash = '#homepage'; // Redireciona para a página de feed
  } else {
    window.location.hash = ''; // Redireciona para a página de login
  }
});*/
});