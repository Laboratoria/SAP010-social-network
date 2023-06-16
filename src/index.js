// inportar o template criado 
import login from "./pages/login/login.js";
import register from "./pages/register/register.js";

//  Load evento de carregamento da janela/ depois printar informações na tela 
const main = document.querySelector("#root")

// função para acessar cada pagina e fazer a função funcionar



const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = "";
         switch (window.location.hash){
             case " ":
             main.appendChild(login());
             break;
            case "#register":
              main.appendChild(register());
             break;
           default:
            main.appendChild(login());
        } 
    })
 }

 window.addEventListener("load", () => {
  main.appendChild(login()); //printar na tela 
  init();
 })



// Função para manipular a alteração do hash
// const handleHashChange = () => {
//   const hash = window.location.hash;
//   main.innerHTML = "";
 
//   if (hash === "") {
//     main.appendChild(login());
//   } else if (hash === "#register") {
//     main.appendChild(register());
//   } else {
//     main.appendChild(login()); // Página padrão quando o hash não corresponde a nenhuma página
//   }
// };

// // Função de inicialização
// const init = () => {
//   // Manipular o evento hashchange
//   window.addEventListener("hashchange", handleHashChange);

//   // Verificar o hash atual ao carregar a página
//   handleHashChange();
// };

// // Carregar a página
// window.addEventListener("load", init);

