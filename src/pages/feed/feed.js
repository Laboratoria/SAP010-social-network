import { adicionarPost, exibirPosts, sairDaConta } from '../../lib/firebase';
import { auth } from '../../lib/firebase-config';

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
    <div class="post-publicar">
    <select name="select-nivel" class="select">
    <option value="selecione">Seu nível de habilidade:</option>
  <option value="iniciante">Iniciante</option>
  <option value="intermediário">Intermediario</option>
  <option value="avançado">Avançado</option>
</select>
      <textarea id="story" name="story" rows="5" cols="33" maxlength="200" placeholder="Qual sua dica hoje?"></textarea>
      <button id="btn-publicar">PUBLICAR</button>
   </div>
   <div class="post"></div>

     `;

  container.innerHTML = template;

  // Função para abrir o menu
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

  // Evento de clique no botão de menu
  const botaoMenu = container.querySelector('#btn-menu');
  botaoMenu.addEventListener('click', abrirMenu);

  // Evento de clique no botão de sair
  const botaoSair = container.querySelector('#sair');
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

  // Obter o nome de usuário atual
  const username = auth.currentUser.displayName;

  // Função para exibir um post na tela
  function printarPost(username, conteudo, nivel) {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
         <header><h2>${username}</h2>
         <h3 class='nivel'>${nivel}</h3></header>
         <span><p>${conteudo}</p></span>
       `;
    const feedElement = container.querySelector('.post');
    feedElement.appendChild(postElement);
  }

  // Exibir todos os posts ao carregar a página
  exibirPosts().then((array) => {
    array.forEach((post) => {
      printarPost(post.username, post.conteudo, post.nivel);
    });
  });

  //  selectNivel.addEventListener('change', (evento) => {
  //   const opcaoNivel = evento.target.value;
  //   if (opcaoNivel === 'selecione') {
  //     alert('selecione seu nivel');
  //     evento.preventDefault();
  //   }
  //  })

  // Evento de clique no botão de publicar
  const btnPublicar = container.querySelector('#btn-publicar');
  btnPublicar.addEventListener('click', (event) => {
    const textarea = container.querySelector('#story');
    const texto = textarea.value;
    const selectNivel = container.querySelector('.select');
    let nivel = selectNivel.value;

    if (nivel === 'selecione') {
      alert('selecione seu nivel');
      event.preventDefault();
    } else {
      adicionarPost(username, texto, nivel)
        .then(() => {
          printarPost(username, texto, nivel);
        })
        .catch((error) => {
          console.error('Erro ao adicionar o post:', error);
        });

      textarea.value = '';
    }
  });

  return container;
};