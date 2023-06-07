import { logOut } from '../../firebase/firebase';
import './feed.css';

export default () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');
  const templateFeed = `
    <header class="header">
      <div class="hamburger-menu">
        <img class="icon-menu" src="images/menu-hamburger.svg" alt="menu hamburguer">
      </div>
      <h1>&lt;GAMEE&gt;</h1>
      <nav class="menu-nav">
        <p>Meu perfil</p>
        <p>Feed</p>
        <p>Sair</p>
      </nav>
    </header>
    <main class="feed">
      <button class="btn-logout">Sair</button>
      <div class="container-input-post">
        <textarea name="" id="user-text-area" cols="5" rows="10" placeholder="O que está jogando?"></textarea>
        <div class="div-btn-publish">
          <button class="btn-publish">Publicar</button>
        </div>
      </div>
    </main>
    `;
  containerFeed.innerHTML = templateFeed;

  const btnLogOut = containerFeed.querySelector('.btn-logout');

  btnLogOut.addEventListener('click', async () => {
    try {
      await logOut();
      window.location.href = '#home';
    } catch (error) {
      console.log(error.message);
    }
  });

  return containerFeed;
};
