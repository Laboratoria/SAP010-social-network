import { sairDaConta } from '../../lib/firebase';

export default () => {
  const container = document.createElement('div');
  container.id = 'cssfeed';

  const template = `
  <div>
   <nav id="menu">
     <h1>FIGHT BACK</h1>
     <ul class="lista-menu">
      <li><picture> 
      <input type="checkbox" id="check-feed">
      <label for="check">
       <img src="imagens/icon-feed.png" class="icon-feed" alt="imagem para acessar o feed"></picture></li>
      <li><picture>
      <input type="checkbox" id="check-sos">
      <label for="check">
       <img src="imagens/icon-sos.png" class="icon-sos" alt="imagem para solicitar suporte"></picture></li>
       <li><picture>
       <input type="checkbox" id="check-sair">
       <label for="check">
       <img src="imagens/icon-sair.png" class="icon-sair" alt="imagem para sair "></picture></li>
     </ul>
     <button id="btn-menu"><img src="imagens/icon-menu.png"></button>
    </nav>

    <ul class="lista-menu-mobile">
      <li><img src="imagens/icon-feed.png" class="icon-feed" alt="imagem para acessar o feed"><p>Feed</p></li>
      <li><img src="imagens/icon-sos.png" class="icon-sos" alt="imagem para solicitar suporte"><p>Suporte</p></li>
      <li id="sair"><img src="imagens/icon-sair.png" class="icon-sair" alt="imagem para sair "><p>Sair</p></li>
    </ul>
  </div>
    <header>
     <picture id="mulher-feed"><img src="imagens/menina-feed.png"></picture>
    </header>
    <div class="post-feed">
    <select name="select-nivel" class="select">
    <option value="selecione" selected>Seu nível de habilidade:</option>
  <option value="iniciante">Iniciante</option>
  <option value="intermed">Intermediario</option>
  <option value="avançado">Avançado</option>
</select>
      <textarea id="story" name="story" rows="5" cols="33" placeholder="Qual sua dica hoje?"></textarea>
      <button id="btn-publicar">PUBLICAR</button>
   </div>

     `;

  container.innerHTML = template;

  const botaoMenu = container.querySelector('#btn-menu');

  function abrirMenu() {
    const listaMenu = container.querySelector('.lista-menu-mobile');

    if (listaMenu.style.display === 'none') {
      listaMenu.style.display = 'block';
    } else if (document.body.clientWidth >= 768) {
      listaMenu.style.display = 'none';
    } else {
      listaMenu.style.display = 'none';
    }
  }

  botaoMenu.addEventListener('click', abrirMenu);

  const botaoSair = container.querySelector('#sair');

  botaoSair.addEventListener('click', () => {
    sairDaConta()
      .then(() => {
      // Sign-out successful.
        alert('Voce saiu');
        window.location.hash = '';
      })
      .catch((error) => {
      // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`);
      });
  });

  return container;
};
