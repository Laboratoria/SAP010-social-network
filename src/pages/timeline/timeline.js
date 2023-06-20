import { getUserName, getUserId } from '../../firebase/auth.js';
import { createPost, accessPost, deletePost } from '../../firebase/firestore.js';

export default () => {
  const timeline = document.createElement('div');
  const viewPost = `
    <p class="postTitle">Olá ${getUserName()}, bem-vindo (a) de volta!</p>
    <div class='timeline'>
      <div class='input-container'>
        <textarea class='input-message' id='postArea' placeholder='COMPARTILHE UMA EXPERIÊNCIA ...'></textarea>
        <button class='shareBtn' id='sharePost'>COMPARTILHAR</button>
      </div>
      <div id='postList'></div>
    </div>
  `;

  timeline.innerHTML = viewPost;

  const postBtn = timeline.querySelector('#sharePost');
  const descriptionPost = timeline.querySelector('#postArea');
  const postList = timeline.querySelector('#postList');

  const CreatePostElement = (name, createdAt, description, postId, authorId) => {
    const createdAtDate = new Date(createdAt.seconds * 1000);
    const createdAtFormattedDate = createdAtDate.toLocaleDateString();
    const createdAtFormattedTime = createdAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const createdAtFormatted = `${createdAtFormattedDate} ~ ${createdAtFormattedTime}`;

    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <div class="post-container">
        <div class='nameUser'>
          <p class='userName'>${name}</p>
          <p class='dataPost'>${createdAtFormatted}</p>
        </div>
        <p class='textPost'>${description}</p>
        <figure class='image-icons'>
          <nav>
            <button type="button" class='icons' id='likePost'>
              <a class='icons' id='likePost'><img src='img/assets/likeicon.png' alt='like image' width='30px'></a>
            </button>
            <button type="button" class='icons' id='editPost'>
              <a class='icons' id='editPost'><img src='img/assets/editicon.png' alt='edit image' width='30px'></a>
            </button>
            ${authorId === getUserId() ? `<button type="button" class='icons' id='btn-delete' data-post-id='${postId}'><img src='img/assets/deleteicon.png' alt='delete image' width='30px'></button>` : ''}
          </nav> 
        </figure>
      </div>
    `;
    return postElement;
  };

  const loadPosts = async () => {
    postList.innerHTML = '';
    const postsFirestore = await accessPost();
  
    const currentUserID = getUserId();
  
    postsFirestore.forEach((post) => {
      const postElement = CreatePostElement(post.name, post.createdAt, post.description, post.id, post.author);
  
      postList.appendChild(postElement);
    });
  };

  postBtn.addEventListener('click', () => {
    const description = descriptionPost.value;

    if (!description) {
      alert('Preencha o campo');
    } else {
      createPost(description)
        .then(() => {
          descriptionPost.value = '';
          loadPosts();
          alert('Publicação efetuada com sucesso!');
        })
        .catch(() => {
          alert('Ocorreu um erro ao criar o post. Por favor, tente novamente mais tarde');
        });
    }
  });



  postList.addEventListener('click', (event) => {
    const target = event.target;
    const deleteButton = target.closest('#btn-delete');
    if (deleteButton) {
      const postId = deleteButton.getAttribute('data-post-id');

      if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
        deletePost(postId)
          .then(() => {
            loadPosts();
            alert('Publicação excluída com sucesso!');
          })
          .catch((error) => {
            alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde');
          });
      }
    }
  });

  loadPosts();
  return timeline;
};
