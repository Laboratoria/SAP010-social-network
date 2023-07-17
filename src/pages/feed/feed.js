export default () => {
  const container = document.createElement('div');
  container.id = 'cssfeed';

  const template = `
  <div>
   <nav id="menu">
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
     <button id="btn-menu"><img src="imagens/icon-menu.png"></button>
    </nav>

    <ul class="lista-menu-mobile">
      <li><picture> 
      <input type="checkbox" id="check-perfil">
      <label for="check">
       <img src="imagens/icon-perfil.png" class="icon-perfil" alt="imagem para acessar o perfil"> <p>Perfil</p></label></picture></li>
      <li><picture> 
      <input type="checkbox" id="check-feed">
      <label for="check">
       <img src="imagens/icon-feed.png" class="icon-feed" alt="imagem para acessar o feed"><p>Feed</p></label></picture></li>
      <li><picture>
      <input type="checkbox" id="check-sos">
      <label for="check">
       <img src="imagens/icon-sos.png" class="icon-sos" alt="imagem para solicitar suporte"><p>Suporte</p></label></picture></li>
       <li><picture>
       <input type="checkbox" id="check-sair">
       <label for="check">
       <img src="imagens/icon-sair.png" class="icon-sair" alt="imagem para sair "><p>Sair</p></label></picture></li>
     </ul>
   </div>
    <header>
     <picture id="mulher-feed"><img src="imagens/menina-feed.png"></picture>
    </header>
     `


  container.innerHTML = template;

  const botaoMenu = container.querySelector("#btn-menu");

  botaoMenu.addEventListener("click", abrirMenu);

  function abrirMenu() {
    const listaMenu = container.querySelector(".lista-menu-mobile");

    if (listaMenu.style.display === "none") {
      listaMenu.style.display = "block";
    } else {
      listaMenu.style.display = "none";
    }
  }


  return container;
}