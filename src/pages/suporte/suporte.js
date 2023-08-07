import { sairDaConta } from "../../lib/firebase";

export default () => {
    const container = document.createElement('div');
    container.id = 'csssuporte';
  
    const template = `
    <div>
   <nav id="menu">
     <h1>FIGHT BACK</h1>
     <ul class="lista-menu">
      <li><img src="imagens/icon-feed.png" class="icon-feed" alt="imagem para acessar o feed"></li>
      <li><img src="imagens/icon-sos.png" class="icon-sos" alt="imagem para solicitar suporte"></li>
      <li class="sair"><img src="imagens/icon-sair.png" class="icon-sair" alt="imagem para sair "></li>
     </ul>
     <button id="btn-menu"><img src="imagens/icon-menu.png"></button>
    </nav>

    <ul class="lista-menu-mobile">
      <li><img src="imagens/icon-feed.png" class="icon-feed" alt="imagem para acessar o feed"><p>Feed</p></li>
      <li class="suporte"><img src="imagens/icon-sos.png" class="icon-sos" alt="imagem para solicitar suporte"><p>Suporte</p></li>
      <li class="sair"><img src="imagens/icon-sair.png" class="icon-sair" alt="imagem para sair "><p>Sair</p></li>
    </ul>
  </div>
      <article>
      <p class="mensagem-sos">
      Você merece viver uma vida livre de medo e violência. Não importa sua origem, idade, raça, religião ou situação financeira, nosso compromisso é apoiá-la incondicionalmente.
      Nós acreditamos em você e em sua força. Lembre-se de que denunciar não é apenas sobre responsabilizar o agressor, mas também sobre buscar justiça e proteção para si mesma e para outras mulheres que podem estar passando pela mesma situação.
      Sinta-se à vontade para explorar nosso site, aprender mais sobre sua defesa pessoal, encontrar recursos úteis e entrar em contato conosco para buscar apoio e orientação. Estamos aqui para ouvir, acreditar e apoiar você, sem julgamentos.
      Lembre-se, você merece uma vida segura e feliz. Denuncie a violência e dê o primeiro passo em direção a uma jornada de cura e libertação. Conte conosco, estamos ao seu lado em cada passo do caminho."</p>
       <div class="botoes">
      <button id="btn-cinza-home">
      <a href="https://www.gov.br/mdh/pt-br/assuntos/denuncie-violencia-contra-a-mulher/violencia-contra-a-mulher" target="_blank">SOS</a>
    </button>      </div>
      </article>`;
  
    container.innerHTML = template;
     // Função para abrir o menu
  function abrirMenu() {
    const listaMenu = container.querySelector('.lista-menu-mobile');

    if (listaMenu.style.display === 'none') {
      listaMenu.style.display = 'block';
    } else {
      listaMenu.style.display = 'none';
    }
  }
   // Evento de clique no botão de menu
   const botaoMenu = container.querySelector('#btn-menu');
   botaoMenu.addEventListener('click', abrirMenu);
 
   // Evento de clique no botão de sair
   const botaoSair = container.querySelectorAll('li.sair');
   botaoSair.addEventListener('click', () => {
     sairDaConta()
       .then(() => {
         alert('Você saiu');
         window.location.hash = '';
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.error(`${errorCode} - ${errorMessage}`);
       });
   });
   
   const botaoFeed = container.querySelector('.feed');
   botaoFeed.addEventListener('click', () => {
       window.location.hash = '#feed';
   });
   
  
    return container;
  };

  
  