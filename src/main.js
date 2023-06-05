import {cadastro, home, login} from "./login.js"

const main = document.querySelector("#main")
const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML="";
        switch(window.location.hash){
        case " ": 
        main.appendChild(home());
        break
        case "#login": 
        main.appendChild(login());
        break
        case "#cadastro":
        main.appendChild(cadastro());
        break    
    }    
    })
}

window.addEventListener("load", () => {
    main.appendChild(home());
    init()
})


