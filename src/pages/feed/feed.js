export default () => {
    const container = document.createElement('div');
    container.id = 'cssfeed';

    const template = `
  <div>
   <menu id="menu">
     <h1>FIGHT BACK</h1>
     <ul class="lista-menu">
      <li><picture> 
      <input type="checkbox" id="check-perfil">
      <label for="check">
       <img src="imagens/icon-perfil.png" class="icon-perfil" alt="imagem para acessar o perfil"></label></picture></li>
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
    </menu>
    <nav id="navegaçao">
       <ul class="lista-navegaçao">
        <li>Perfil</li>
        <li>Feed</li>
        <li>Suporte</li>
        <li>Sair</li>
        </ul>
     </nav>
   </div>
    <header>
     <picture id="mulher-feed"><img src="imagens/menina-feed.png"></picture>
    </header>
     `


    container.innerHTML = template;

    return container;
}