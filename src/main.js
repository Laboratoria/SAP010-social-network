import { login } from './pages/login/login.js';

const main = document.querySelector('#root');

const init = () => {
  //adiciona um callback no evento hashchange
  //hashchange é chamado toda vez que tem uma troca de # (window.location.hash), ou seja, muda o final da url
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';

    switch (window.location.hash) {
      case "#homepage":
        //main.appendChild()//criar função() para a nova tela com os elementos da home.
        break

      case "#createaccount":
        //main.appendChild()//criar função() para a nova tela para cadastro de usuário.
        break

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
