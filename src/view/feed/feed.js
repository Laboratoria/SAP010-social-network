import { logOut, createPost, listAllPosts } from '../../firebase/firebase';
import './feed.css';



export default () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');
  const templateFeed = `
    <header>
      <div class="header">
        <picture class="hamburger-menu">
          <img class="icon-menu" src="images/menu-hamburger.svg" alt="menu hamburguer">
        </picture>
        <div class="title-menu">
          <h1>&lt;GAMEE&gt;</h1>
        </div>
      </div>
      <nav class="menu-nav">
        <ul>
          <a href="#profile"><li>Meu perfil</li></a>
          <a href="#feed"><li>Feed</li></a>
          <a href="" class="btn-logout"><li>Sair</li></a>
        </ul>
      </nav>
    </header>
    <main class="feed">
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

  const imgHamburgerMenu = containerFeed.querySelector('.hamburger-menu');

  imgHamburgerMenu.addEventListener('click', () => {
    const itensMenu = containerFeed.querySelector('.menu-nav');
    if (itensMenu.style.display == 'none') {
      itensMenu.style.display = 'block';
    } else {
      itensMenu.style.display = 'none';
    }
  });

  const btnPublish = containerFeed.querySelector('.btn-publish');

  btnPublish.addEventListener('click', async () => {
    const post = containerFeed.querySelector('#user-text-area');
    await createPost(post.value);
    post.value = '';
  });

  return containerFeed;

};

listAllPosts().then(posts => {
  posts.forEach(post => {
    console.log(post)
    const date = JSON.stringify(post.dateTime.toDate());
    const feed = `
      <div class= "post">
        <div>Publicado por ${post.user}</div>
        <div>${post.content}</div>
        <div>${post.likes}</div>
        <div>${date}</div>
      </div>
    `;
    console.log(post.user);
    console.log(post.content);
    console.log(post.likes);
    console.log(date);
  })
});



