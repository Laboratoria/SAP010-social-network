// import CBD from "../imagens/CBD.png";
import "./home.css";
import CBD from "../imagens/CBDCNNCT-IMG/logodesktopsombreada.png";
// import "../../main.js";

export default () => {
  const container = document.createElement("div");
  container.classList.add("container-home");

  const template = `
  <img class="img-CBD" src=${CBD} alt="logo app">
  <h1 class="container-h1 texto">Bem-vindo(a) a <br>CBD Connect!</h1>
  <p class="container-text texto">Sua rede social que conecta pacientes e profissionais prescritores de Cannabis Medicinal. Sinta-se à vontade para compartilhar seu tratamento, publicar informações ou encontrar o profissional prescritor mais adequado pra você.</p>
  <nav>
  <a href="#login" id="entrar" class="seta">&rarr;</a>
  </nav>
  
  `;

  container.innerHTML = template;

  return container;
};
// <p id="entrar"class="seta">&rarr;</p>
