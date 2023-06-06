import { getUsers, db } from './lib/firebase.js';
// import { feed } from './components.js/feed.js';

import { register } from './components.js/register.js';
import { feed } from './components.js/feed.js';
import { welcome } from './components.js/welcome.js';
// import { sobre } from './components.js/sobre.js';

const main = document.getElementById('root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
        main.appendChild(welcome());
        break;

      case '#register':
        main.appendChild(register());
        break;
      case '#feed':
        main.appendChild(feed());
        break;

      default:
        main.appendChild(welcome());
    }
  });
};

window.addEventListener('load', () => {
  // a fução getusers é uma função assincrona e ela retorna uma promisse
  getUsers(db).then((data) => console.log(data));
  main.appendChild(welcome());
  init();
});
