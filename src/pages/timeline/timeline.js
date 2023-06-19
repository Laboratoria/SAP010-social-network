import { getUserName } from '../../firebase/auth.js';
import { createPost, accessPost } from '../../firebase/firestore.js';

export default () => {
  const timeline = document.createElement('div');
  const viewPost = `
    <h1>Olá ${getUserName()}, bem-vindo (a) de volta!</h1>
    <div class='timeline'>
      <div class='input-container'>
        <input type='text' class='input-mensage' id='postArea' placeholder='COMPARTILHE UMA EXPERIÊNCIA ...'>
        <button class='shareBtn' id='sharePost' >COMPARTILHAR</button>
        <div id='postList'></div>
      </div>
      <!-- <figure class='image-timeline'>
      <img src='img/assets/imagetimeline.png' class='img-timeline' alt='timelineImage'>
      </figure>-->
    </div>
    `;

  timeline.innerHTML = viewPost;

  const postBtn = timeline.querySelector('#sharePost');
  const descriptionPost = timeline.querySelector('#postArea');
  const postList = timeline.querySelector('#postList');

  const CreatePostElement = (name, description) => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
    <div class="post-container">
    <p class='nameUser'>${name}</p>
    <p class='textPost'>${description}</p>
    <figure class='image-icons'>
    <nav>
      <a class='btn-like' id='likePost'><img src='img/assets/likeicon.png' alt='like image' width='30px'></a>
      <a class='btn-edit' id='editPost'><img src='img/assets/editicon.png' alt='edit image' width='30px'></a>
      <a class='btn-delete' id='deletePost'><img src='img/assets/deleteicon.png' alt='delete image' width='30px'></a>
    </nav> 
    </figure>
    </div>
    `;
    return postElement;
  };

  postBtn.addEventListener('click', () => {
    const description = descriptionPost.value;

    if (!description) {
      alert('Preencha o campo');
    } else {
      createPost(description)
        .then(() => {
          descriptionPost.value = ''; /* limpa o input */
          loadPosts();
          alert('Publicação efetuada com sucesso!');
        })
        .catch((error) => {
          alert('Ocorreu um erro ao criar o post. Por favor, tente novamente mais tarde');
        });
    }
  });

  const loadPosts = async () => {
    postList.innerHTML = '';
    const postsFirestore = await accessPost();

    postsFirestore.forEach((post) => {
      const postElement = CreatePostElement(post.name, post.description);
      postList.appendChild(postElement);
    });
  };
  loadPosts();
  return timeline;
};
