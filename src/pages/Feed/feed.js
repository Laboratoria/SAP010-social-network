import { userLogout } from '../../lib/authUser.js';
import {posts, exibAllPosts } from '../../lib/firestore.js';

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
  //const textoPostagem = feedContainer.querySelector('#textoMensagem');

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

  btnPost.addEventListener('click', () =>{
    const textoPostagem = feedContainer.querySelector('#textoMensagem');

    if(true){
      //testar se mensagem foi digitada
      //textoPostagem = mensagemPost.value;
      //console.log(textoPostagem);
    } 
    posts()
      .then(() => {
        
      }).catch((error) => {
        console.log(error);
    });
      //limpar campo de input após a postagem
      // puxar função inicio depois da criação do post para que seja exibido
  })

  // montagem do post
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
    <div class='post-container'>
      <div class='nameUser'>
        <p class='userName'>${nameUser}</p>
        <p class='dataPost'>${createdAtFormatted}</p>
      </div>
      <p class='textPost'>${textPost}</p>
        <div class='image-icons'>
          <button type='button' class='icons-post' id='like-Post' data-post-id='${postId}'>
            <a class='icon-post' id='icons-post'><img src=''/></a> 
          </button>`;

    return postElement;
  };


  //publicações aqui
  const inicio = () => {
    const postagemElement = feedContainer.querySelector('#postagem');
    exibAllPosts()
      .then((listaPosts) => {
        for(let i = 0; i < listaPosts.length; i++){
        const itemPost = createPostElement(listaPosts[i].nameUser, listaPosts[i].date, listaPosts[i].textPost, listaPosts[i].postId)
          postagemElement.appendChild(itemPost);
        } 
      }).catch((error) => {
      console.log(error);
    });
  }
  
  inicio();

  return feedContainer;

};

