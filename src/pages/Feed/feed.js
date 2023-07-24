import './feed.css';
import { userLogout, getUserName } from '../../lib/authUser.js';
import {posts, exibAllPosts } from '../../lib/firestore.js';

import deleteicon from '../../img/icons/icones-delete.svg';

export default () => {
  const feedContainer = document.createElement('div');
  const templateFeed = `
  <header>
      <picture><img class="logo" src="./img/icon_logo_contraplano.png"></picture>
      <div>
        <img></img>
        <h3> Feed </h3>
        <p class='userName'>Olá, ${getUserName()}! Vamos comentar sobre filmes e séries?</p>
      </div>
  <section class="inicioFeed">
  </section>
  <div class="postagens">
    <textarea class="inputMensagem" id="textoMensagem" placeholder="Compartilhe comentários sobre os filmes e séries do momento" rows="8" cols="50"></textarea>
    <button class="btn-delete" id="btn-delete"><img class="" src="./img/icons/icones-delete.svg">Cancel</button>
    <button class="btn-post" id="btn-send-post"><img class="" src="./img/icons/icones-send.svg">Post</button>
    <div id="mensagemErro" class="error"></div>
  </div>

  <section id="listPosts" class="posts">
  </section>
  <section>
    <button class="btn-perfil" id="btn-perfil"><img class="" src="./img/icons/icones-user1.svg">Perfil</button>
    <button class="btn-logout" id="btn-logout"><img class="" src="./img/icons/icones-logout.svg">Log Out</button>
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
  const btnDeletePost = feedContainer.querySelector('#btn-delete-post');
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
    const createdAtDate = new Date(date);
    const createdAtFormattedDate = createdAtDate.toLocaleDateString('pt-BR');
    const createdAtFormatted = `${createdAtFormattedDate}`;
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
            <a class='icon-post' id='icons-post'><img alt='like icon' class='icons-post' src="./img/icons/icones-like2.svg"/>LIKE</a> 
          </button>
          <button class="btn-post" id="btn-edit-post"><img alt='edit icon' class='icons-post' src="./img/icons/icones-edit.svg">Edit</button>
          <button class="btn-post" id="btn-delete-post"><img alt='delete icon' class='icons-post' src="${deleteicon}">Delete</button>
      </div>
    </section>`;

    return postElement;
  };

  //lista de publicações aqui
  const inicioPosts = () => {
    exibAllPosts()
      .then((listaPosts) => {
        for(let i = 0; i < listaPosts.length; i++){
        const itemPost = createPostElement(listaPosts[i].nameUser, listaPosts[i].date, listaPosts[i].textPost, listaPosts[i].postId)
        listPosts.appendChild(itemPost);
        } 
      }).catch((error) => {
      console.log(error);
    });
  }
  
  inicioPosts();

  //ADD NOVO POST: fazer postagem nova direto do app/web
  btnPost.addEventListener('click', () =>{
    const textoPostagem = textoMensagemEntrada.value;

    if(!textoPostagem){
      //ajustar alerts
      alert('preencha a mensagem antes de enviar.')
      console.log('mensagem não digitada');
    } else{
      posts(textoPostagem)
      .then(() => {
        textoMensagem.value = '';
        alert('Comentário publicado!')
        //location.reload();
        //recarregar a pagina
      })
      .catch((error) => {
        alert('Ocorreu um erro na publicação. Tente novamente.')
        console.log(error);
    });
    }
  })

  //DELETAR POST: selecionar e deletar comentário feito pelo proprio usuário

  // botão função de logout
  btnLogout.addEventListener('click', () => {
    userLogout()
      .then(() => {
        window.location.hash = '#login';
      }).catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  return feedContainer;

};

