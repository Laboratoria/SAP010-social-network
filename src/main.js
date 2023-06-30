// Este es el punto de entrada de tu aplicacion
// import createUserWithEmailAndPassword from "./lib/configFirebase";

// createUserWithEmailAndPassword();

import login from "./pages/login/login.js";
import home from "./pages/home/home.js";

const main = document.getElementById("root");
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
      default:
        main.appendChild(home());
    }
  });
};

window.addEventListener("load", () => {
  main.appendChild(home());
  init();
});

const ir_login = document.getElementById("entrar"); /*evento para a seta*/
window.onload = function () {
  ir_login.addEventListener("click", () => {
    window.location.hash = "/#login";
  });
};
