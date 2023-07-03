import { logOut } from '../../fireBase/firebaseAuth.js';
import { auth } from '../../fireBase/firebaseConfig.js';
import {
  fetchPosts,
  createPost,
  likeCounter,
  deslikeCounter,
  deletePost,
  editPost,
} from '../../fireBase/firebaseStore.js';
import customAlert from '../../components/customAlert.js';

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.classList.add('feed-container');

  const content = `
    <section class="header">
      <h2 class="titleHeader">TravellersBook<img class="logoHeader" src="./img/balão1.png" alt="balão"></h2>

      <nav class="menu">
        <a href='#home'>Home</a>
        <a id='button-logout'>Sair</a>
      </nav>
    </section>

    <section class="publish">
      <input id='input-text' class='input-text' type='text' placeholder='Compartilhe suas aventuras...'></input>
      <button id='button-publish' class='button-publish'>Publicar</button>
    </section>

    <div id="feed"></div>`;

  feedContainer.innerHTML = content;

  const inputText = feedContainer.querySelector('#input-text');

  const buttonPublish = feedContainer.querySelector('#button-publish');
  buttonPublish.addEventListener('click', () => {
    createPost(
      new Date(),
      auth.currentUser.displayName,
      inputText.value,
      auth.currentUser.uid
    )
      .then(() => {
        customAlert('Seu post foi publicado com sucesso');
        inputText.value = '';
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
  showFeed();

  return feedContainer;
};

async function showFeed() {
  const posts = await fetchPosts();
  const feedElement = document.getElementById('feed');

  feedElement.innerHTML = '';

  posts.forEach(post => {
    const postElement = createPostElement(post, feedElement);
    feedElement.appendChild(postElement);
  });

  return feedElement;
}

function createPostElement(post, feedElement) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.setAttribute('data-post-id', post.id);

  const { seconds, nanoseconds } = post.date;

  const dataEmMilissegundos = seconds * 1000 + nanoseconds / 1000000;

  const data = new Date(dataEmMilissegundos);

  const ano = data.getFullYear();
  const mes = ('0' + (data.getMonth() + 1)).slice(-2);
  const dia = ('0' + data.getDate()).slice(-2);
  const hora = ('0' + data.getHours()).slice(-2);
  const minuto = ('0' + data.getMinutes()).slice(-2);

  const btnEdit =
    post.uid === auth.currentUser.uid
      ? "<p class='button-edit'><img src='./img/editar.png' alt='edit image' class='icons-post'></p>"
      : '';

  const btnDelete =
    post.uid === auth.currentUser.uid
      ? "<p class='button-delete'id='button-delete'><img src='./img/excluir.png' alt='delete image' class='icons-post'></p>"
      : '';

  const content = `
    <div class="informations">
      <p class="name">${post.username}</p>
      <p class="date">${dia}/${mes}/${ano} ${hora}:${minuto}</p>
    </div>
    <p class="text">${post.text}</p>
    <div class='container-btn'> 
      <p id='button-like'><img src='./img/gostar.png' alt='like image' class='icons-post'></p>
      <p class="like" id='text-like-count'>${post.likes.length}</p>
      ${btnEdit}
      ${btnDelete}
    </div>
  `;

  postElement.innerHTML = content;

  const textLikeCount = postElement.querySelector('#text-like-count');

  let processingClick = false;
  const buttonLike = postElement.querySelector('#button-like');
  buttonLike.addEventListener('click', async () => {
    const currentUser = auth.currentUser.displayName;
    const likesArray = post.likes;

    if (!processingClick) {
      processingClick = true;
      // Caso o usuario já esteja no array de likes, quer dizer que ele já deu like
      // então vamos tirar ele do array de likes
      if (likesArray.includes(currentUser)) {
        await deslikeCounter(post.id, currentUser);
        //foi removido do array de likes dessa publicação lá no Firebase
        // mas ainda precisamos tirar o usuario do array que esta na variavel local
        const index = likesArray.indexOf(currentUser);
        if (index !== -1) {
          likesArray.splice(index, 1);
        }
        // depois vamos atualizar o campo com o numero de likes
        textLikeCount.innerHTML = likesArray.length;
        processingClick = false;
      } else {
        await likeCounter(post.id, currentUser);
        // foi adicionado do array de likes dessa publicação lá no Firebase
        // mas ainda precisamos adicionar o usuario no array que esta na variavel local
        likesArray.push(currentUser);
        textLikeCount.innerHTML = likesArray.length;
        processingClick = false;
      }
    }
  });

  const buttonDelete = postElement.querySelector('#button-delete');
  if (buttonDelete) {
    buttonDelete.addEventListener('click', async () => {
      console.log('clicou no botao');
      await deletePost(post.id);

      feedElement.removeChild(postElement);

      // const isAuthor = currentUser;
      // if (isAuthor === post.uid) {
    });
  }

  // Inside the createPostElement function
  const buttonEdit = postElement.querySelector('.button-edit');
  if (buttonEdit) {
    buttonEdit.addEventListener('click', () => {
      const postId = postElement.getAttribute('data-post-id');
      const newText = prompt('Digite o novo texto:');
      if (newText) {
        editPost(postId, newText)
          .then(() => {
            const textElement = postElement.querySelector('.text');
            textElement.textContent = newText;
            alert('Post atualizado com sucesso!');
          })
          .catch(error => {
            console.error('Erro ao editar o post:', error);
            alert(
              'Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde.'
            );
          });
      }
    });
  }

  return postElement;
}
