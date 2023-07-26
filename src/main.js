// Este es el punto de entrada de tu aplicacion

//import { myFunction } from './index.js';

//myFunction();

import { cadastro } from './Pages/Cadastro/index.js';
import { login } from './Pages/Login/login.js';
import { recuperarSenha } from './Pages/Recuperar senha/recuperar_senha.js';
import home from './Pages/Home/index.js';


const container = document.querySelector("#container");
const init = () => {
    window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    switch(window.location.hash) {
        case " ":
            main.appendChild(home());
            break;
        case "#login":
            main.appendChild(login());
            break;
        case "#cadastro":
            main.appendChild(cadastro());
            break;
        case "#recuperar":
            main.appendChild(recuperarSenha());
            break;
        case "#cadastro-clique-aqui":
            main.appendChild(cadastro());
            break;
        default:
            main.appendChild(home());

    }
  })
}

window.addEventListener("load", () => {
    container.appendChild(home());
    init();
})
