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
      <li><a href="/#feed"><img src="imagens/icon-feed.png" class="icon-feed" alt="imagem para acessar o feed"><p>Feed</p></a></li>
      <li><a href="/#sos"><img src="imagens/icon-sos.png" class="icon-sos" alt="imagem para solicitar suporte"><p>Suporte</p></a></li>
      <li><a href="/#"><img src="imagens/icon-sair.png" class="icon-sair" alt="imagem para sair "><p>Sair</p></a></li>
    </ul>
   </div>
    <header>
     <picture id="mulher-feed"><img src="imagens/menina-feed.png"></picture>
    </header>
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

  return container;
};
