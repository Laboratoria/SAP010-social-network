import { createPost } from '../../firebase/firestore.js';

export const templatePost = () => {
  const divPost = document.createElement('div');
  const viewPost = `
    
      <div class="containerPost" id="containerPost">
        <p id="containerPost-p" class="containerPost-experience">"COMPARTILHE UMA EXPERIÊNCIA ..."/p>
        <div id="containerTextarea">  
        <form id="formPost" method="POST">
        
        <textarea name="" id="ExplorAi" class="Explorai" cols="30" rows="10" placeholder="COMPARTILHE UMA EXPERIÊNCIA ..." required></textarea> <br>
       
      </div>
      <div class="buttonPost">
        <button class="buttonPostOne" id="publicButton" type="submit">COMPARTILHAR</button>
        <button class="buttonCancel" id="cancelButton">Cancelar</button>
       </div>    
    </form>
   </div>
  `;
  divPost.innerHTML = viewPost;

  const btnpost = divPost.querySelector('#publicButton');
  btnpost.addEventListener('click', () => {
    createPost();
  });
  const btnCancel = divPost.querySelector('#cancelButton');
  btnCancel.addEventListener('click', () => {
    window.location.href = '#/timeline';
  });
  return divPost;
};
