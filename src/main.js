import { loginUser } from './Login/login.js';
import { registerUser } from './Register/register.js';
import { feedUser } from './Feed/feed.js';

const root = document.querySelector('#root');

//verifica se  usuário está logado ou não e para cada opção tem uma rota que a ni já tinhha feito
const isLoggedIn = () => {
  const token = window.localStorage.getItem('token');
  return Boolean(token);
};

export const routes = () => {
  root.innerHTML = '';
  if (isLoggedIn()) {
    switch (window.location.hash) {
      case '#feed':
        root.appendChild(feedUser());
        break;
      default:
        root.appendChild(feedUser());
    }
    
  } else {
    switch (window.location.hash) {
      case ' ':
        root.appendChild(loginUser());
        break;
      case '#register':
        root.appendChild(registerUser());
        break;
      default:
        root.appendChild(loginUser());
    }
  }
  
};

const init = () => {
  window.addEventListener('hashchange', routes);
};
//                                         || adicionado o routes também como um parametro
//adicionado porque está tendo um delay ao usuário logar e ir para o feed, algo para arrumar ou não
window.addEventListener('load', () => {
  root.innerHTML = '<h1>Carregando...</h1>';
  init();
  // root.appendChild(registerUser());
  // init();
  // root.appendChild(feedUser());
  // init();
});
