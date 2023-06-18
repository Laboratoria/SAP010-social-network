import { getUserName, getAppAuth } from '../../firebase/auth.js';
import { createPost } from '../../firebase/firestore.js';

export default () => {
  const userName = getUserName();
  const timeline = document.createElement('div');

  timeline.innerHTML = `
    <h1>Bem-vindo ${userName} à linha do tempo!</h1>
    <div class='input-container'>
    <input type='text' class='input-mensage' id='postArea' placeholder='COMPARTILHE UMA EXPERIÊNCIA ...'>
    <button class='shareBtn' id='sharePost' >COMPARTILHAR</button>
</div>
    `;

  timeline.style.display = 'block';

  const postBtn = timeline.querySelector('#sharePost');
  const descriptionPost = timeline.querySelector('#postArea');

  postBtn.addEventListener('click', () => {
    const description = descriptionPost.value;

    if (!description) {
      alert('Preencha o campo');
    } else {
      createPost(description)
        .then(() => {
          alert('Publicação efetuada com sucesso!');
          window.location.hash = '#timeline';
        });
    }
  });
  return timeline;
};
