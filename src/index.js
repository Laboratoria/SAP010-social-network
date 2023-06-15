// inportar o template criado 
import login from "./pages/login/login.js";
import register from "./pages/register/register.js";


const main = document.querySelector("#root")
//  Load evento de carregamento da janela/ depois printar informações na tela 

window.addEventListener("load", () => {

    main.appendChild(register());

})





