// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

import home from "./pages/home/home";

const principal = document.querySelector("#principal");

window.addEventListener("load", () => {
    principal.appendChild(home());
})