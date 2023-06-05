// aqui exportaras las funciones que necesites
import home from "./pages/home.js";

const main = document.querySelector("#root");

window.addEventListener("load", () =>{
  main.appendChild(home());
})


/*export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};*/
