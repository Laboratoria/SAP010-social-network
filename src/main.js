import home from "./view/homee/home.js";
import login from "./view/login/login.js";
import register from "./view/register/register.js";
import feed from "./view/feed/feed.js";

const main = document.querySelector("#main")

/* const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    switch(window.location.hash){
      case "":
        main.appendChild(home());
        break;
      case "#login":
        main.appendChild(login());
        break;
      case "#cadastro":
        main.appendChild(register());
        break;  
      default: 
        main.appendChild(home());
    }
  })
}
*/