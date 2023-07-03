import { getUserName, getUserId, logOut } from '../../firebase/auth.js';
import {
  createPost,
  accessPost,
  updatePost,
  likePost,
  deletePost,
} from '../../firebase/firestore.js';
import photoicon from '../../assets/photoicon.png';
import homeicon from '../../assets/homeicon.png';
import exiticon from '../../assets/exiticon.png';
import imagetimeline from '../../assets/imagetimeline.png';
import likeicon from '../../assets/likeicon.png';
import editicon from '../../assets/editicon.png';
import deleteicon from '../../assets/deleteicon.png';

export default () => {
  const timeline = document.createElement('div');
  const viewPost = `
  <div class='container'>
    <div class='left-timeline'>

      <img src='${photoicon}' alt='Foto de perfil' class='profilePhoto' />
      <p class='postTitle'>Olá ${getUserName()}, bem-vindo(a) de volta!</p>
      <figure class='icones'>
        <button type='button' class='button-timeline' id='home-btn'><img src='${homeicon}' class='icon-timeline' alt='Icone home'></button>
        <button type='button' class='button-timeline' id='logout-btn'><img src='${exiticon}' class='icon-timeline' alt='logout icon'></button>
      </figure>
    </div>
    <img src='${imagetimeline}' class='img-timeline' alt='edit image' />
    <div class='right-timeline'>
      <div class='input-container'>
        <textarea class='input-message' id='postArea' placeholder='COMPARTILHE UMA EXPERIÊNCIA...'></textarea>
        <button class='shareBtn' id='sharePost'>COMPARTILHAR</button>
      </div>
      <div id='postList'></div>
    </div>
  </div>
  `;

  timeline.innerHTML = viewPost;

  const postBtn = timeline.querySelector('#sharePost');
  const descriptionPost = timeline.querySelector('#postArea');
  const postList = timeline.querySelector('#postList');
  const logOutBtn = timeline.querySelector('#logout-btn');

  const createPostElement = (
    name,
    createdAt,
    description,
    postId,
    authorId,
    whoLiked,
  ) => {
    const createdAtDate = new Date(createdAt.seconds * 1000);
    const createdAtFormattedDate = createdAtDate.toLocaleDateString('pt-BR');
    const createdAtFormattedTime = createdAtDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const createdAtFormatted = `${createdAtFormattedDate} ~ ${createdAtFormattedTime}`;
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <div class='post-container'>
        <div class='nameUser'>
          <p class='userName'>${name}</p>
          <p class='dataPost'>${createdAtFormatted}</p>
        </div>
        <p class='textPost'>${description}</p>
          <div class='image-icons'>
            <button type='button' class='icons-post' id='like-Post' data-post-id='${postId}'>
              <a class='icons-post' id='icons-post'><img src='${likeicon}' alt='like image' class='icons-post'></a>
            </button>
          ${authorId === getUserId() ? `<button type='button' data-post-id='${postId}' class='icons-post' id='editPost'>
            <a class='icons-post'><img src='${editicon}' alt='edit image' class='icons-post'></a>
          </button>
          <button type='button' class='icons-post' id='btn-delete' data-post-id='${postId}'>
            <img src='${deleteicon}' alt='delete image' class='icons-post'>
          </button>` : ''}
        </div>
        <span class='likePost' id='likes-counter-${postId}'>${whoLiked.length}</span>
      </div>
`;

    return postElement;
  };

  const updateListPost = (TodosPosts) => {
    postList.innerHTML = '';
    TodosPosts.forEach(async (post) => {
      const {
        name, createdAt, description, id, author, whoLiked,
      } = post;
      const postElement = createPostElement(
        name,
        createdAt,
        description,
        id,
        author,
        whoLiked,
      );
      postList.appendChild(postElement);

      const likeButton = postElement.querySelector('#like-Post');
      const postId = likeButton.getAttribute('data-post-id');
      const likesCounter = postElement.querySelector(`#likes-counter-${postId}`);
      likeButton.addEventListener('click', async () => {
        try {
          const likeLike = await likePost(postId, getUserId());
          let currentLikes = parseInt(likesCounter.innerText, 10);
          if (likeLike === 'adicione like') {
            currentLikes += 1;
          } else {
            currentLikes -= 1;
          }
          likesCounter.innerText = currentLikes;
        } catch (error) {
          console.error('Error ao dar like:', error);
        }
      });
    });
  };

  const loadPosts = async () => {
    await accessPost(updateListPost);
  };

  const handlePostBtnClick = () => {
    const description = descriptionPost.value;

    if (!description) {
      alert('Preencha o campo');
    } else {
      createPost(description)
        .then(() => {
          descriptionPost.value = '';
          alert('Publicação efetuada com sucesso!');
        })
        .catch(() => {
          alert('Ocorreu um erro ao criar o post. Por favor, tente novamente mais tarde');
        });
    }
  };

  const handlePostListClick = (event) => {
    const target = event.target;
    const deleteButton = target.closest('#btn-delete');
    const editButton = target.closest('#editPost');
    if (deleteButton) {
      const postId = deleteButton.getAttribute('data-post-id');
      if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
        deletePost(postId)
          .then(() => {
            target.closest('.post-container').remove(); // remove da tela os posts que são excluídos
            alert('Publicação excluída com sucesso!');
          })
          .catch((error) => {
            alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde', error);
          });
      }
    } else if (editButton) {
      const postId = editButton.getAttribute('data-post-id');
      const postElement = editButton.closest('.post-container');
      const textPostElement = postElement.querySelector('.textPost');
      const newText = prompt('Edite a sua postagem:', textPostElement.textContent);
      if (newText && newText.trim() !== '') {
        updatePost(postId, { description: newText })
          .then(() => {
            textPostElement.textContent = newText;
            alert('Post atualizado com sucesso!');
          })
          .catch(() => {
            alert('Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde');
          });
      }
    }
  };

  postBtn.addEventListener('click', handlePostBtnClick);
  postBtn.addEventListener('touchstart', handlePostBtnClick);
  postList.addEventListener('click', handlePostListClick);
  postList.addEventListener('touchstart', handlePostListClick);

  logOutBtn.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  loadPosts();
  return timeline;
};
