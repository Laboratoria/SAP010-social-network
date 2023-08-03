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
    container.innerHTML = "";
    switch(window.location.hash) {
        case " ":
            container.appendChild(home());
            break;
        case "#login":
            container.appendChild(login());
            break;
        case "#cadastro":
            container.appendChild(cadastro());
            break;
        case "#recuperar":
            container.appendChild(recuperarSenha());
            break;
        case "#cadastro-clique-aqui":
            container.appendChild(cadastro());
            break;
        default:
            container.appendChild(home());

    }
  })
}

window.addEventListener("load", () => {
    container.appendChild(home());
    init();
})
