import home from "./pages/home/home.js";
import about from "./pages/about/about.js"
import feed from "./pages/feed/feed.js";

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    console.log(window.location.hash)
    switch(window.location.hash){
      case " ":
        main.appendChild(home());
        break;
      case "#about":
        main.appendChild(about());
        break;
      case "#feed":
        main.appendChild(feed());
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