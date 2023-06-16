// inportar o template criado 
import login from "./pages/login/login.js";
//import app from "./app/loginapp.js";
import register from "./pages/register/register.js";

//  Load evento de carregamento da janela/ depois printar informações na tela 
const main = document.querySelector("#root")

// função para acessar cada pagina e fazer a função funcionar


window.addEventListener("load", () => {
  
    main.appendChild(login()); //printar na tela 
})

