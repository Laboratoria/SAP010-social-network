import { logOut } from '../../fireBase/firebaseAuth.js';
import { fetchPosts} from '../../fireBase/firebaseStore.js';
import customAlert from '../../components/customAlert.js'

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.classList.add('feed-container');

  const content = 
  `<section class="header">
  <h2 class="titleHeader">TravellersBook<img class="logoHeader" src="./img/balão1.png" alt="balão"></h2>

  <nav class="menu">
    <a href='#home'>Home</a>
    <a href='#publicar'>Publicar</a>
    <a id='button-logout'>Sair</a>
  </nav>
</section>
<div id="feed"></div>`;
  feedContainer.innerHTML = content;

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
  
/*     const publishElement = createPublishElement();
    feedElement.appendChild(publishElement); */
  
    posts.forEach((post) => {
      const postElement = createPostElement(post.data, post.nome, post.like, post.texto);
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
