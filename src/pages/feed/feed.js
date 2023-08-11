import {
  adicionarPost,
  exibirPosts,
  sairDaConta,
  deletarPost,
  editarPost,
} from '../../lib/firebase';
import { auth } from '../../lib/firebase-config';
import iconfeed from '../../imagens/icon-feed.png';
import iconsos from '../../imagens/icon-sos.png';
import iconsair from '../../imagens/icon-sair.png';
import meninafeed from '../../imagens/menina-feed.png';
import iconeditar from '../../imagens/icon-editar.png';
import icondeletar from '../../imagens/icon-deletar.png';
import iconmenu from '../../imagens/icon-menu.png';

export default () => {
  const container = document.createElement('div');
  container.id = 'cssfeed';

  const template = `
  <div class="container-menu">
   <nav id="menu">
     <h1>FIGHT BACK</h1>
     <ul class="lista-menu">
      <li><img src="${iconfeed}" class="icon-feed" alt="imagem para acessar o feed"></li>
      <li class="suporte"><img src="${iconsos}" class="icon-sos" alt="imagem para solicitar suporte"></li>
       <li class="sair"><img src="${iconsair}" class="icon-sair" alt="imagem para sair "></li>
     </ul>
     <button id="btn-menu"><img src="${iconmenu}"></button>
    </nav>

    <ul class="lista-menu-mobile">
      <li><img src="${iconfeed}" class="icon-feed" alt="imagem para acessar o feed"><p>Feed</p></li>
      <li class="suporte"><img src="${iconsos}" class="icon-sos" alt="imagem para solicitar suporte"><p>Suporte</p></li>
      <li class="sair"><img src="${iconsair}" class="icon-sair" alt="imagem para sair "><p>Sair</p></li>
    </ul>
  </div>
    <header>
     <picture id="mulher-feed"><img src="${meninafeed}"></picture>
    </header>
    <div class="post-publicar">
    <select name="select-nivel" class="select">
    <option value="selecione">Nível de habilidade:</option>
  <option value="iniciante">Iniciante</option>
  <option value="intermediário">Intermediario</option>
  <option value="avançado">Avançado</option>
</select>
      <textarea id="story" name="story" rows="5" cols="33" maxlength="200" placeholder="Qual sua dica hoje?"></textarea>
      <button id="btn-publicar">PUBLICAR</button>
   </div>
   <div class="post"></div>
   <div id="modal" class="modal">
    <div class="modal-content">
      <p id="modal-text"></p>
      <button id="modal-close">OK</button>
    </div>
  </div>

     `;

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
  botaoSair.forEach((botao) => botao.addEventListener('click', () => {
    sairDaConta()
      .then(() => {
        window.location.hash = '';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode} - ${errorMessage}`);
      });
  }));

  const botaoSos = container.querySelectorAll('li.suporte');
  botaoSos.forEach((botao) => botao.addEventListener('click', () => {
    window.location.hash = '#suporte';
  }));

  // Função para exibir um post na tela
  function printarPost(username, conteudo, nivel, id) {
    const postElement = document.createElement('section');
    postElement.innerHTML = `
        <header><h2>${username}</h2>
         <h3 class='nivel'>${nivel}</h3></header>
         <span><p class='conteudo'>${conteudo}</p></span>
         <div class='botoes-post'>

         <button class="btn-editar" data-post-id="${id}">
           <img src="${iconeditar}" class="icon-editar" alt="imagem para editar o post">
         </button>

         <button class="btn-deletar" data-post-id="${id}">
         <img src="${icondeletar}" class="icon-deletar" alt="imagem para deletar o post">
         </button>
       </div>`;
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const modalClose = document.getElementById('modal-close');

    const btnDeletar = postElement.querySelector('.btn-deletar');

    btnDeletar.addEventListener('click', () => {
      if (username === auth.currentUser.displayName) {
        const postId = btnDeletar.getAttribute('data-post-id');
        deletarPost(postId);
        postElement.remove();
        modalText.textContent = 'Post deletado';
        modal.style.display = 'block';
      } else {
        modalText.textContent = 'Você só pode deletar o seu próprio post';
        modal.style.display = 'block';
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
              // Atualiza o texto exibido no post
              const postTextoElement = postElement.querySelector('.conteudo');
              postTextoElement.textContent = novoConteudo;
              modalText.textContent = 'Post editado com sucesso!';
            })
            .catch((error) => {
              console.error('Erro ao editar o post:', error);
            });
        }
      } else {
        modalText.textContent = 'Você só pode editar o próprio post';
        modal.style.display = 'block';
      }
    });

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    const feedElement = container.querySelector('.post');
    feedElement.appendChild(postElement);
  }

  // Obter o nome de usuário atual
  const nome = auth.currentUser.displayName;

  // Evento de clique no botão de publicar

  const btnPublicar = container.querySelector('#btn-publicar');
  btnPublicar.addEventListener('click', async (event) => {
    event.preventDefault();

    const textarea = container.querySelector('#story');
    const texto = textarea.value.trim();
    const selectNivel = container.querySelector('.select');
    const nivel = selectNivel.value;

    if (texto === '') {
      const modal = document.getElementById('modal');
      const modalText = document.getElementById('modal-text');
      modalText.textContent = 'Você não pode postar um conteúdo vazio';
      modal.style.display = 'block';
      return;
    }

    if (nivel === 'selecione') {
      const modal = document.getElementById('modal');
      const modalText = document.getElementById('modal-text');
      modalText.textContent = 'Selecione seu nível';
      modal.style.display = 'block';
      return;
    }

    try {
      await adicionarPost(nome, texto, nivel);
      printarPost(nome, texto, nivel); // Exibir o post na tela
      textarea.value = '';
    } catch (error) {
      console.error('Erro ao adicionar o post:', error);
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
