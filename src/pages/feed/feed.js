import {
  adicionarPost,
  exibirPosts,
  sairDaConta,
  deletarPost,
  editarPost,
} from '../../lib/firebase';
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

  // Função para exibir um post na tela
  function printarPost(username, conteudo, nivel, id) {
    const postElement = document.createElement('section');
    postElement.innerHTML = `
        <header><h2>${username}</h2>
         <h3 class='nivel'>${nivel}</h3></header>
         <span><p class='conteudo'>${conteudo}</p></span>
         <div>
         <button class="btn-deletar" data-post-id="${id}"></button>
         <img src="imagens/icon-deletar.png" class="icon-deletar" alt="imagem para deletar o post">

         </div>
         <div>
         <button class="btn-editar" data-post-id="${id}">
           <img src="imagens/icon-editar.png" class="icon-editar" alt="imagem para editar o post">
         </button>
       </div>`;


    const btnDeletar = postElement.querySelector('.btn-deletar');
    btnDeletar.addEventListener('click', () => {
      if (username === auth.currentUser.displayName) {
        const postId = btnDeletar.getAttribute('data-post-id');
        deletarPost(postId);
        postElement.remove();
        alert('post deletado');
      } else {
        alert('voce so pode deletar o proprio post');
      }
    });
    const btnEditar = postElement.querySelector('.btn-editar');
btnEditar.addEventListener('click', () => {
  if (username === auth.currentUser.displayName) {
    const postId = btnEditar.getAttribute('data-post-id');
    const novoConteudo = prompt('Editar o post:', conteudo);

    if (novoConteudo !== null) {
      editarPost(postId, novoConteudo)
        .then(() => {
          conteudo = novoConteudo;
          // Atualiza o texto exibido no post
          const postTextoElement = postElement.querySelector('.conteudo');
          postTextoElement.textContent = novoConteudo;
          alert('Post editado com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao editar o post:', error);
        });
    }
  } else {
    alert('Você só pode editar o próprio post');
  }
});

    const feedElement = container.querySelector('.post');
    feedElement.appendChild(postElement);
  }

  // Obter o nome de usuário atual
  const nome = auth.currentUser.displayName;

  // Evento de clique no botão de publicar
  const btnPublicar = container.querySelector('#btn-publicar');
  btnPublicar.addEventListener('click', (event) => {
    const textarea = container.querySelector('#story');
    const texto = textarea.value;
    const selectNivel = container.querySelector('.select');
    const nivel = selectNivel.value;

    if (nivel === 'selecione') {
      alert('selecione seu nivel');
      event.preventDefault();
    } else {
      adicionarPost(nome, texto, nivel)
        .then(() => {
          printarPost(nome, texto, nivel);
        })
        .catch((error) => {
          console.error('Erro ao adicionar o post:', error);
        });

      textarea.value = '';
    }
  });

  // Exibir todos os posts ao carregar a página
  exibirPosts()
    .then((array) => {
      array.forEach((post) => {
        printarPost(post.username, post.conteudo, post.nivel, post.id);
      });
    });

  return container;
};
