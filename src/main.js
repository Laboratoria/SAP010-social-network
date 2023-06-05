import login from "./pages/login/login.js";
import register from "./pages/register/register.js"
import timeline from "./pages/timeline/timeline.js"



const main = document.querySelector("#root");

// const init = () => {
    window.addEventListener ("hashchange", () =>{
        main.innerHTML = "";
        console.log(window.location.hash)
        switch(window.location.hash){
            case "#login":
            main.appendChild(login());
            break;
            case "#register":
            main.appendChild(register());
            break;
            case "#timeline":
            main.appendChild(timeline());
            break;
            default:
            main.appendChild(login());
        }
    })
// }


window.addEventListener ("load", () =>{
    if (window.location.hash === "#register") {
        main.appendChild(register());
      } else if (window.location.hash === "#timeline") {
        main.appendChild(timeline());
      } else {
        main.appendChild(login());
      }
    // init();
})




