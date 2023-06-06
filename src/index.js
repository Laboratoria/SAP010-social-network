import home from "./pages/home/home.js";
import cadastrar from "./pages/cadastrar/cadastrar.js";

const main = document.querySelector("#root");

const init = () => {
 window.addEventListener("hashchange",() => {
  main.innerHTML="";
  switch(window.location.hash){
    case  " ":
      main.appendChild(home());
      break;
    case "#cadastrar":
      main.appendChild(cadastrar());
      break;
    default:
      main.appendChild(home());
  }
 })
}

window.addEventListener("load", () =>{
  main.appendChild(home());
  init();
})


