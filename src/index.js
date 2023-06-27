// inportar o template criado
import login from './pages/login/login.js';
import register from './pages/register/register.js';

import feed from './pages/feed/feed.js';
import cafeComRum from './pages/cafeComRum/cafeComRum.js';

//  Load evento de carregamento da janela/ depois printar informações na tela
const main = document.querySelector('#root');

// função para acessar cada pagina e fazer a função funcionar
const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case ' ':
        main.appendChild(login());
        break;
      case '#register':
        main.appendChild(register());
        break;
      case '#login':
        main.appendChild(login());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      case '#cafeComRum':
        main.appendChild(cafeComRum());
        break;
      default: main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login()); // printar na tela
  init();
});
