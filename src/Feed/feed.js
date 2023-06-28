import './feed.css';
import { authStateChanged } from '../lib/index';

export const feedUser = () => {
  const container = document.createElement('div');

  const template = ` 
  <main>
    <sidebar>
      <header>
        <h1>Food Review</h1>
      </header>
      <nav>
        <ul>
          <li class="nav-item"><a href="#feed"><img width="34px" height="34px" src="Img/home-feed.svg"/>Feed</a></li>
          <li class="nav-item"><a href="#perfil"><img src="Img/profile-feed.svg"/>Perfil</a></li>
          <li class="nav-item"><a href="#sobre"><img src="Img/info-feed.svg"/>Sobre</a></li>
          <li class="nav-item"><a href="#sair"><img src="Img/logout-feed.svg"/>Sair</a></li>
        </ul>
      </nav>
    </sidebar>

    <section class="feed">
      <img src="Img/bg-feed.png"/>
      <div class="boxExperience">
        <button id="experienceButton" class="experience-button">Qual experiência você teve hoje?</button>
      </div>
      <div class="post-list"> 
        <div class="card">
          <div class="card-header">
            
            <div class="card-user">
              <div class="card-avatar"> <img src="https://placekitten.com/50/50"/></div>
              <h5>Roxane Principe</h5>
            </div>
            <div class="card-actions">...</div>
          </div>
          <div class="card-description">
            <p>Estou surpresa por ser um ambiente tão bom, comida boa e com o ótimo atendimento que inclusive fomos atendidos pelo baixinho. Ele foi ótimo e muito atencioso com a gente e com todos ao redor. A comida é maravilhosa, uma experiência incrível, todos tem que fazer isso um dia!</p>
          </div>
          <div class="card-info">
            <div class="card-likes"><3 5</div>
            <div class="card-restaurant">Starbucks</div>
          </div>
        </div>
      </div>
    </section>
 </main>
  <div id="createPost" class="post">
    <div class="post-content">
      <span id= "close" class="close" onclick="closeModal()">&times;</span>
      <div class='photo'>
        <img class='profilePicture' id="userPhoto" src="" alt="Foto do perfil">
        <span class='profileName' id="userName"></span>
      </div>
      <textarea class='inputContent' id="postContent" placeholder="Qual experiência você teve hoje?" required></textarea>
      <form class='formPost'>
        <label class='profileRestaurant' for="postLocation">Restaurante:</label>
        <input class='inputLocation' type="text" id="postLocation" required>
        <button class='buttonPublish' id="publishButton" onclick="publishPost()">Publicar</button>
      </form>
    </div>
  </div>
  `;

  container.innerHTML = template;

  const modal = container.querySelector('#createPost');
  const closeButton = container.querySelector('#close');
  // const publishButton = container.getElementById('publishButton');
  const openPublishButton = container.querySelector('#experienceButton');

  // Função para abrir o modal
  function openModal() {
    modal.style.display = 'block'; // Exibe o modal
  }

  // Função para fechar o modal
  function closeModal() {
    modal.style.display = 'none'; // Oculta o modal
  }

  openPublishButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  // Esse trecho de código permite fechar o modal quando o usuário clica fora da área do modal.

  authStateChanged((user) => {
    if (user) {
      const userNameElement = document.getElementById('userName');
      const userPhotoElement = document.getElementById('userPhoto');
      userNameElement.textContent = user.displayName;
      if (user.photoURL) {
        userPhotoElement.src = user.photoURL;
      } else {
        userPhotoElement.style.display = 'none'; // Oculta o elemento se não houver foto de perfil
      }
    }
  });

  return container;
};
