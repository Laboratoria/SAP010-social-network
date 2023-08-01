// aqui exportaras las funciones que necesites
import home from "../pages/home/home.js";
import feed from "../pages/feed/feed.js";


const main = document.querySelector('#root');

window.addEventListener("load", () =>{
  main.appendChild(home());
})

window.addEventListener("load", () =>{
  main.appendChild(feed());
})


/*export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};
*/