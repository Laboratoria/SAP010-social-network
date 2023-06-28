import { logOut } from '../../fireBase/firebaseAuth.js';
import { fetchPosts, createFeedData } from '../../fireBase/firebaseStore.js';
import customAlert from '../../components/customAlert.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.classList.add('feed-container');

  const content = `<section class="header">
  <h2 class="titleHeader">TravellersBook<img class="logoHeader" src="./img/balão1.png" alt="balão"></h2>

  <nav class="menu">
    <a href='#home'>Home</a>
    <a href='#publicar'>Publicar</a>
    <a id='button-logout'>Sair</a>
  </nav>
</section>

<input id='input-text' class='input-text' type='text' placeholder='Compartilhe suas aventuras...'></input>
<button id='button-publish' class='button-publish'>Publicar</button>

<div id="feed"></div>`;

  feedContainer.innerHTML = content;

  const inputText = feedContainer.querySelector('#input-text');

  const buttonPublish = feedContainer.querySelector('#button-publish');
  buttonPublish.addEventListener('click', () => {
    // descobrir como pegar a data do sistema
    // descobrir como pegar o user name
    createFeedData(0, 'nome', 0, inputText.value)
      .then(() => {
        customAlert('Seu post foi publicado com sucesso');
        showFeed();
      })
      .catch(() => {
        customAlert('Erro ao publicar post');
      });
  });

  const buttonLogOut = feedContainer.querySelector('#button-logout');
  buttonLogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#login';
        header.innerHTML = '';
      })
      .catch(() => {
        customAlert('Erro ao sair. Tente novamente.');
      });
  });

  async function showFeed() {
    const posts = await fetchPosts();
    const feedElement = document.getElementById('feed');

    feedElement.innerHTML = '';
    inputText.value = ' ';

    posts.forEach(post => {
      const postElement = createPostElement(
        post.data,
        post.nome,
        post.like,
        post.texto
      );
      feedElement.appendChild(postElement);
    });

    return feedElement;
  }

  function createPostElement(date, name, like, text) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const content = `
      <div class="informations">
        <p class="name">${name}</p>
        <p class="date">${date}</p>
      </div>
      <p class="text">${text}</p>
      <p class="like">Likes: ${like}</p>
    `;

    postElement.innerHTML = content;

    return postElement;
  }
  showFeed();
  return feedContainer;
};
