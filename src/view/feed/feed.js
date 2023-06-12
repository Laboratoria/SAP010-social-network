import { async } from 'regenerator-runtime';
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

  //criar função showPosts e ela recebe o conteudo de allPosts
  const postsList = document.createElement('section');
  const showPosts = (post) => {
    const feed = `
      <div class= "post" style="color: white;">
        <div>Publicado por ${post.user}</div>
        <div>${post.content}</div>
        <div>${post.likes}</div>
        <div>${post.dateTime.toDate().toLocaleDateString()}</div>
      </div>
    `;
    postsList.innerHTML += feed;
    containerFeed.appendChild(postsList);
  }

  const btnPublish = containerFeed.querySelector('.btn-publish');

  btnPublish.addEventListener('click', async () => {
    console.log('chamei o click')
    const post = containerFeed.querySelector('#user-text-area');
    const postInput = post.value;
    if (postInput.length > 0) {
      await createPost(postInput);
      post.value = '';
      listAllPosts().then(posts => {
        postsList.innerHTML = '';
        posts.forEach(post => {
          showPosts(post)
        })
      });
    } else {
      alert('Não pode publicar um post vazio!');
    }
  });

  listAllPosts().then(posts => {
    posts.forEach(post => {
      showPosts(post)
    })
  });
  return containerFeed;

};
