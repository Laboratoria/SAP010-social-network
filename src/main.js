import { getUsers, db } from './lib/firebase.js';
//import { feed } from './components.js/feed.js';

import { register } from './components.js/register.js'

import { welcome } from './components.js/welcome.js'
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

      default:
        main.appendChild(welcome());
    }
  });
};

window.addEventListener('load', () => {
  getUsers(db).then((data) => console.log(data)); //a fução getusers é uma função assincrona e ela retorna uma promisse
  main.appendChild(welcome());
  init();
});
