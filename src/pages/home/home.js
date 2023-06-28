import CBD from '../imagens/CBD.png';
import './home.css';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container-home');

  const template = `
  <img class="img-CBD" src=${CBD} alt="logo app">
  <h1 class="'container-h1">Bem-vindo(a) a <br>CBD Connect!</h1>
  <p class="'container-text">Sua rede social que conecta pacientes e profissionais prescritores de Cannabis Medicinal. Sinta-se à vontade para compartilhar seu tratamento, publicar informações ou encontrar o profissional prescritor mais adequado pra você.</p>
  `;

  container.innerHTML = template;

  return container;
};
