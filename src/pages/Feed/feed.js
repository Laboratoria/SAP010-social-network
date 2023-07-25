import './feed.css';
import { userLogout, getUserName, getUserId } from '../../lib/authUser.js';
import {posts, exibAllPosts, deletePost } from '../../lib/firestore.js';

import logocontraplano from '../../img/icon_logo_contraplano.png';
import perfilicon from '../../img/icons/icones-user1.svg';
import commentarea from '../../img/icons/icones-comment.svg';
import newposticon from '../../img/icons/icones-send.svg';
import logouticon from '../../img/icons/icones-logout.svg';
import likeicon from '../../img/icons/icones-like2.svg';
import editicon from '../../img/icons/icones-edit.svg';
import deleteicon from '../../img/icons/icones-delete.svg';;

export default () => {
  const oldStyles = document.getElementsByTagName("link");
  if(oldStyles.length > 1) oldStyles[1].remove();
  const stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href','pages/Feed/feed.css');
  document.head.appendChild(stylesheet);

  const feedContainer = document.createElement('div');
  const templateFeed = `
  <header class="headerfeed">
      <picture><img class="logofeed" src="${logocontraplano}"></picture>
      <div>
        <img></img>
        <h3> Feed </h3>
        <p>Olá, ${getUserName()}! Vamos comentar sobre filmes e séries?</p>
      </div>
  <section>
    <button class="btn-perfil" id="btn-perfil"><img class="icon" src="${perfilicon}"></button>
    <button class="btn-logout" id="btn-logout"><img class="icon" src="${logouticon}"></button>
  </section>
  </header>
  <section class="inicioFeed">
  </section>
  <div id="new-comment">
  <button class="btn-post" id="btn-new-comment-area">
    <img class="icon" alt='new comment area icon' src="${commentarea}">
  </button>
  </div>
  <div id="postagens" class="hidden">
    <textarea class="inputMensagem" id="textoMensagem" placeholder="Ei, me conta o que você tem assistido..." rows="8" cols="40"></textarea>
    <button class="btn-delete" id="btn-clean-delete"><img class="icon" alt='clean area icon' src="${deleteicon}"></button>
    <button class="btn-post" id="btn-send-post"><img class="icon" alt='new post icon' src="${newposticon}"></button>
    <div id="mensagemErro" class="error"></div>
  </div>
    <section id="listPosts" class="posts">
    </section>
  <footer>
      
  </footer>`;
  

  feedContainer.innerHTML = templateFeed;

  //para funcionar os posts  
  const listPosts = feedContainer.querySelector('#listPosts');

  // Informações preenchidas pelo usuário
  const textoMensagemEntrada = feedContainer.querySelector('#textoMensagem');

  // Botões
  const btnPost = feedContainer.querySelector('#btn-send-post');
  const btnCleanDelete = feedContainer.querySelector('#btn-clean-delete');
  const btnEditPost = feedContainer.querySelector('#btn-edit-post');
  const btnLogout = feedContainer.querySelector('#btn-logout');

  // montagem de unico post
  const createPostElement = (
    nameUser,
    date,
    textPost,
    postId,
    uidUser,
  ) => {
    const createdAtDate = date.toDate();
    const createdAtFormattedDate = createdAtDate.toLocaleDateString('pt-BR');
    const createdAtFormattedTime = createdAtDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const createdAtFormatted = `${createdAtFormattedDate} ~ ${createdAtFormattedTime}`;
    const postElement = document.createElement('div');
    postElement.innerHTML = `
    <section class="post-container">
      <div class='nameUser'>
        <p class='userName'>${nameUser}</p>
        <p class='dataPost'>Data: ${createdAtFormatted}</p>
        <p class='textPost'>${textPost}</p>
      </div>
      <div class='icons'>
          <button type='button' class='icons-post' id='like-Post' data-post-id='${postId}'>
            <a class='icon-post' id='icons-post'><img alt='like icon' class='icon' src="${likeicon}"/></a> 
          </button>
          <button class="btn-post" id="btn-edit-post" data-remove="postId"><img alt='edit icon' class='icon' src="${editicon}"></button>
          <button class="btn-post" 
            id="btn-delete-post" 
            data-post-id='${postId}' data-user-id='${uidUser}'><img alt='delete icon' class='icon' src="${deleteicon}"></button>
      </div>
    </section>`;

    return postElement;
  };

  //lista de publicações aqui
  const inicioPosts = () => {
    exibAllPosts()
      .then((listaPosts) => {
        // limpar a lista de posts antes atualizar
        listPosts.innerHTML = '';  
        // adicionar os posts na ordem inversa, para ordenação mais recente
        for (let i = listaPosts.length - 1; i >= 0; i--) {
          console.log(listaPosts[i]);
          const itemPost = createPostElement(listaPosts[i].nameUser, listaPosts[i].date, listaPosts[i].textPost, listaPosts[i].id, listaPosts[i].uidUser)
          listPosts.appendChild(itemPost);
        }
        listPosts.style.maxHeight = `${listPosts.offsetHeight - window.innerHeight}px`
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // limpar area de novo post e escutador de acao
const clearTextarea = () => {
  textoMensagemEntrada.value = '';
};
btnCleanDelete.addEventListener('click', clearTextarea);

  //ADD NOVO POST: fazer postagem nova direto do app/web
  btnPost.addEventListener('click', () =>{
    const textoPostagem = textoMensagemEntrada.value;

    if(!textoPostagem){
      //ajustar alerts
      alert('Preencha a mensagem antes de enviar.')
      console.log('Mensagem não digitada');
    } else{
      posts(textoPostagem)
      .then(() => {
        textoMensagem.value = '';
        alert('Comentário publicado!')
        inicioPosts();
        //recarregar a pagina
      })
      .catch((error) => {
        alert('Ocorreu um erro na publicação. Tente novamente.')
        console.log(error);
    });
    }
  })

  //DELETAR POST: selecionar e deletar comentário feito pelo proprio usuário
  const handlePostListClick = (event) => {
    const target = event.target;
    const deleteButton = target.closest('#btn-delete-post');
    if (deleteButton) {
      const postId = deleteButton.getAttribute('data-post-id');
      const uidUser = deleteButton.getAttribute('data-user-id');
      console.log(getUserId(), uidUser);
      if (uidUser === getUserId()){
        if (window.confirm('Quer excluir a publicação?')) {
          deletePost(postId)
            .then(() => {
              target.closest('.post-container').remove();
              alert('Post excluído!');
            })
            .catch((error) => {
              alert('Erro ao excluir o post.', error);
            });
        }
      } else{
        alert('Você não pode deletar esse post!')
      }

    }
  };

  listPosts.addEventListener('click', handlePostListClick);

  // botão função de logout
  btnLogout.addEventListener('click', () => {
    userLogout()
      .then(() => {
        window.location.hash = '#login';
      }).catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  inicioPosts();

  //Função para abrir area de comentário
const commentNewArea = feedContainer.querySelector('#btn-new-comment-area');
const newComment = feedContainer.querySelector('#postagens');

commentNewArea.addEventListener('click', () => {
  console.log('cliquei pra abrir caixa de comentário');
  newComment.classList.toggle('hidden');
  newComment.classList.toggle('visible');
});

  return feedContainer;

};