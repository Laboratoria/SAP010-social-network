import './feed.css';
import { authStateChanged, getFeedItems, publish } from '../lib/index';

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
      <div id="postList"class="post-list"> 
        
      </div>
    </section>
 </main>
  <div id="createPost" class="post">
    <div class="post-content">
      <span id= "close" class="close" onclick="closeModal()">&times;</span>
      <div class='photo'>
        <img referrerpolicy='no-referrer' class='profilePicture' id="userPhoto" src="" alt="Foto do perfil">
        <span class='profileName' id="userName"></span>
      </div>
      <input id="userId" type="hidden"/>
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
      const userIdElement = document.getElementById('userId');
      const userPhotoElement = document.getElementById('userPhoto');
      userNameElement.textContent = user.displayName;
      userIdElement.value = user.uid;
      if (user.photoURL) {
        userPhotoElement.src = user.photoURL;
      } else {
        userPhotoElement.style.display = 'none'; // Oculta o elemento se não houver foto de perfil
      }
    }
  });

  

    getFeedItems().then( (items) => {
       const card = ({description, likes, rating, restaurantName, userAvatar, userName}) => (`
       <div class="card">
        <div class="card-header">
          
          <div class="card-user">
            <div class="card-avatar"> <img src="${userAvatar}"/></div>
            <h5>${userName}</h5>
          </div>
          <div class="card-actions">...</div>
        </div>
        <div class="card-description">
          <p>${description}</p>
        </div>
        <div class="card-info">
          <div class="card-likes">${likes}</div>
          <div class="card-restaurant">${restaurantName}</div>
        </div>
      </div>
      `); 
        const postList = document.querySelector('#postList');
        postList.innerHTML = items.map(card).join('')
    } )

  return container;
};

function publishPost() {

  const userNameElement = document.getElementById('userName');
  const userPhotoElement = document.getElementById('userPhoto');
  const postLocation = document.getElementById('postLocation');
  const postContent = document.getElementById('postContent');
  const userId = document.getElementById('userId');
      

  const post = {
    description: postContent.value, 
    likes: 0,
    rating: 2, 
    restaurantName: postLocation.value, 
    userAvatar: userPhotoElement.src, 
    userName: userNameElement.textContent,
    createdAt: new Date(),
    userId: userId.value,
  }

   publish(post).then(() => {
    const closeButton = document.querySelector('#close');
    closeButton.click();
   })

   

}
window.publishPost = publishPost;