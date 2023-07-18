import { userLogout } from '../../lib/authUser.js';
//import {posts, exibAllPosts } from '../../lib/feedPost.js';

export default () => {
  const feedContainer = document.createElement('div');
  const templateFeed = `
  <header>
      <picture><img class="logo" src="./img/icon_logo_contraplano.png"></picture>
      <div>
        <img></img>
        <h3> Feed </h3>
        <div id="usuario">
      </div>
      <button class="btn-logout" id="btn-logout">Log Out</button>
  <section class="inicioFeed">
  </section>
  <div class="postagens">
    <textarea class="inputMensagem" id="textoMensagem" placeholder="Compartilhe comentários sobre os filmes e séries do momento" rows="8" cols="50"></textarea>
    <button class="btn-post" id="btn-send-post">Postar</button>
    <div id="mensagemErro" class="error"></div>
  </div>

  <section id="postagem" class="posts">

  </section>
  <footer>
      
  </footer>`;

  feedContainer.innerHTML = templateFeed;


  // Informações preenchidas pelo usuário
  const textoPostagem = feedContainer.querySelector('#textoMensagem');

  // Botões
  const btnPost = feedContainer.querySelector('#btn-send-post');
  const btnLogout = feedContainer.querySelector('#btn-logout');

  // botão função de logout
  btnLogout.addEventListener('click', () => {
    userLogout()
      .then(() => {
        window.location.hash = '#login';
      }).catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  // montagem do post
  const createPostElement = (
    nameUser,
    date,
    textPost,
    postId,
    uidUser,
    whoLiked,
  ) => {
    const datePost = new Date(date);
    const createdAtFormattedDate = createdAtDate.toLocaleDateString('pt-BR');
    const createdAtFormatted = `${createdAtFormattedDate} ~ ${createdAtFormattedTime}`;
    const postElement = document.createElement('div');
    postElement.innerHTML = `
    <div class='post-container'>
      <div class='nameUser'>
        <p class='userName'>${nameUser}</p>
        <p class='dataPost'>${date}</p>
      </div>
      <p class='textPost'>${textPost}</p>
        <div class='image-icons'>
          <button type='button' class='icons-post' id='like-Post' data-post-id='${postId}'>
            <a class='icon-post' id='icons-post'><img src='${likeAdd}' 
          </button>`;

    return postElement;
  };

  //publicações aqui

  return feedContainer;

};

