import { getUserName, getAppAuth } from '../../firebase/auth.js';
import {
createPost,
accessPost
} from '../../firebase/firestore.js';
import { getUserId } from '../../firebase/auth';
import { auth } from '../../firebase/app';

export default () => {
  const divPost = document.createElement('div');
  const viewPost = `
    <h1>Bem-vindo ${getUserName()} à linha do tempo!</h1>
    <div class='input-container'>
    <input type='text' class='input-mensage' id='postArea' placeholder='COMPARTILHE UMA EXPERIÊNCIA ...'>
    <button class='shareBtn' id='sharePost' >COMPARTILHAR</button>
</div>
    `;

  divPost.innerHTML = viewPost;

  const postBtn = divPost.querySelector('#sharePost');
  const descriptionPost = divPost.querySelector('#postArea');

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


  accessPost()
  .then((posts) => {
    console.log(posts)
   console.log('printar o conteúdo na tela') 
  })
 .catch(() => {
  console.log('deu errado')
 })

  return divPost;
};
