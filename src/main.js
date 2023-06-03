import home from "./view/homee/home.js";
import login from "./view/login/login.js";
import register from "./view/register/register.js";
import feed from "./view/feed/feed.js";
import { isUserLoggedIn } from "./firebase/firebase.js";

const main = document.querySelector("#main");

const changeScreen = () => {

  window.addEventListener("hashchange", () =>{
    main.innerHTML = "";


    if(isUserLoggedIn()){
      switch(window.location.hash){
        case "":
          main.appendChild(home());
         break; 
        case "#feed":
         main.appendChild(feed());
         break; 
        default: 
         main.appendChild(login());
      }
    } else {

      switch(window.location.hash){
        case "":
          main.appendChild(home());
        break; 
       case "#login":
         main.appendChild(login());
        break;
       case "#register":
        main.appendChild(register());
        break;
       default: 
        main.appendChild(home());
      }
    }
  });
  
}



window.addEventListener("load", () =>{
  if (isUserLoggedIn()) {
    main.appendChild(home());
  } else {
    main.appendChild(login());
  }
  changeScreen();
});

