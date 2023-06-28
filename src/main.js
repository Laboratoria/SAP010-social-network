// Este es el punto de entrada de tu aplicacion
import createUserWithEmailAndPassword from "./lib/configFirebase";


// import { myFunction } from './lib/index.js';

// myFunction();

createUserWithEmailAndPassword();

// import cadastro from "./pages/cadastro/cadastro.js";
import login from "./pages/login/login.js";
import home from "./pages/home/home.js";
// import loading from "./pages/loading";

// loading();

const main = document.querySelector("#root");
const init = () => {
  window.addEventListener("hashchange", () => {
    // console.log(window.location.hash)
    main.innerHTML = " ";
    switch (window.location.hash) {
      case " ":
        main.appendChild(home());
        break;
      case "#login":
        main.appendChild(login());
        break;
      // case "#contacts":
      //   main.appendChild(contact());
      //   break;
      default:
        main.appendChild(home());
    }
  });
};

window.addEventListener("load", () => {
  main.appendChild(home());
  init();
});
