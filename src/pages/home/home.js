import CBD from "../imagens/CBD.png"
import "../home/home.css";

export default () => {
  const container = document.createElement("div");

  const template = `
	<img class="img-CBD" src=${CBD} alt="logo app">
	<h1>Bem-vindo(a) a <br>CBD Connect!</h1>
	<p>Sua rede social que conecta pacientes e profissionais prescritores de Cannabis Medicinal. Sinta-se à vontade para compartilhar seu tratamento, publicar informações ou encontrar o profissional prescritor mais adequado pra você.</p>
  `;

  container.innerHTML = template;

  return container;
};
