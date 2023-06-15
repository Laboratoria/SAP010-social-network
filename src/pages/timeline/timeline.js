import { getUserName } from '../../firebase/auth.js';

export default () => {
  const userName = getUserName();
  const timeline = document.createElement('div');
  timeline.innerHTML = `

    <h1>Bem-vindo ${userName} à linha do tempo!</h1>
    <div class="input-container">
    <input type="text" class="input-mensagem" placeholder="COMPARTILHE UMA EXPERIÊNCIA ...">
    <button class="botao-compartilhar">COMPARTILHAR</button>
</div>
    `;

  return timeline;
};
