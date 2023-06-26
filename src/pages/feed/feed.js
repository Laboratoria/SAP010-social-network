import { logOut } from '../../fireBase/firebaseAuth';
import { userData, fetchPosts, createFeedData } from '../../fireBase/firebaseStore';
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

async function showFeed() {
  const posts = await fetchPosts();
  const feedElement = document.getElementById('feed');

  const publishElement = createPublishElement()
  feedElement.appendChild(publishElement)
  
  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const infoElement = document.createElement("div")
    infoElement.classList.add('Informations')

    const nameElement = document.createElement('p');
    nameElement.textContent = post.nome;

    const dateElement = document.createElement('p');
    dateElement.textContent = post.data;

    const textElement = document.createElement('p');
    textElement.textContent = post.texto;

    const likeElement = document.createElement('p');
    likeElement.textContent = `Likes: ${post.like}`;

    infoElement.appendChild(nameElement);
    infoElement.appendChild(dateElement);
    postElement.appendChild(infoElement)
    postElement.appendChild(textElement);
    postElement.appendChild(likeElement);
    //rootElement.appendChild(postElement);
    feedElement.appendChild(postElement)
  });

  return feedElement;
}

function createPublishElement() {
  const publishElement = document.createElement('div')
  publishElement.classList.add('publish');

  const content = `
    <input id='input-text'></input>
    <button id='button-publish'>Publicar</button>
  `

  publishElement.innerHTML = content

  const inputText = publishElement.querySelector('#input-text')

  const buttonPublish = publishElement.querySelector('#button-publish')
  buttonPublish.addEventListener('click', () => {
    // descobrir como pegar a data do sistema
    // descobrir como pegar o user name
    createFeedData(0, 'nome', 0, inputText.value)
    .then(() => {
      customAlert('Seu post foi publicado com sucesso');
      window.location.hash = '#homepage';
    })
    .catch(() => {
      customAlert('Erro ao publicar post')
    })
  })

  return publishElement
}

export {showFeed, template};

