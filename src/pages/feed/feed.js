import { db } from '../../fireBase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { logOut } from '../../fireBase/firebaseAuth';
import customAlert from '../../components/customAlert';

function template(main){
  const header = document.getElementById('header');

  const headerTemplate = `<section class="header">
  <h2 class="titleHeader">TravellersBook<img class="logoHeader" src="./img/balão1.png" alt="balão"></h2>

  <nav class="menu">
        <a href='#home'>Home</a>

        <a href='#publicar'>Publicar</a>

        <a id='button-logout'>Sair</a>
  </nav>
  </section>`;

  header.innerHTML = headerTemplate;

  const buttonLogOut = header.querySelector('#button-logout');
  buttonLogOut.addEventListener('click', () =>{
    logOut()
      .then(() => {
          window.location.hash = '#login';
          header.innerHTML = '';
        })
        .catch(() => {
          customAlert('Erro ao sair. Tente novamente.');
        });
  });

  const template = `<div id="feed"></div>`;

  main.innerHTML = template;
}

async function fetchPosts() {
  const postsCollection = collection(db, 'posts');
  const snapshot = await getDocs(postsCollection);
  const posts = [];

  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  return posts;
}

async function showFeed() {
  const posts = await fetchPosts();
  const FeedElement = document.getElementById('feed');
  
  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const infoElement = document.createElement("div")
    infoElement.classList.add('Informations')

    const nameElement = document.createElement('p');
    nameElement.textContent = post.Nome;

    const dateElement = document.createElement('p');
    dateElement.textContent = post.Data;

    const textElement = document.createElement('p');
    textElement.textContent = post.texto;

    const likeElement = document.createElement('p');
    likeElement.textContent = `Likes: ${post.like}`;

    infoElement.appendChild(nameElement);
    infoElement.appendChild(dateElement);
    postElement.appendChild(textElement);
    postElement.appendChild(likeElement);
    postElement.appendChild(infoElement)
    //rootElement.appendChild(postElement);
    FeedElement.appendChild(postElement)
  });

  return FeedElement;
}



export {showFeed, template};

