//import {  } from "../../lib/authUser.js";

export default () => {
  const feedContainer = document.createElement('div');
  const templateFeed = `
  <header>
      <picture><img class="logo" src="./img/icon_logo_contraplano.png"></picture>
      <div>
        <img></img>
        <h3> Feed </h3>
        <h2> Nome do Usuário </h2>
        <nav> 
          <ul>
            <li>
              <a href="">Comente um filme</a>
              <a href="">Feed</a>
            </li>
          </ul>
        </nav>

  </header>
  <div>
      <img></img>

  </div>
  <section class="inicioFeed">
  </section>
  <section class="posts">

  </section>
  <footer>
      
  </footer>`;

  feedContainer.innerHTML = templateFeed;

  return feedContainer;
};