
import { getDoc } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";

import {
    pegarPost,
    criarPost,
    likePost
} from "../../lib/firestone";

let userName = ''


export default () => {
    const container = document.createElement('div');

    const template = `

    <header class="header-feed">
    <img src="imagens/logo branca feed.png" class="logo-feed">
    <h1>  Olá, ${userName}!<br> Bora Economizar? </h1>
    </header>

  <form id="formFeed" class="form-feed">
    <label class="inputPubli" for="text">
      <input id="post" class="input-publish" name="text" type="text" placeholder="Clique aqui para digitar seu CUPOM!">
    </label>
    <span id="alertPublish" class="alert-publish"></span>
    <button class="btn" id="btnPubli" type="button">Publicar</button>  
    </form>
   <section 
    id="postContainer" class="post-container">
  </section>   
`;

    container.innerHTML = template;
    


    const btnPublicar = container.querySelector('.btn')
    const conteudo = container.querySelector('.input-publish')
    const formFeed = container.querySelector('.form-feed')
    const alertPublish = container.querySelector('.alert-publish')



    btnPublicar.addEventListener('click', () => {
        const conteudoInput = conteudo.value;
        if (conteudoInput !== '') {
            criarPost(conteudoInput)
                .then(() => {
                    mostrarPost();
                    formFeed.reset();
                    alertPublish.setAttribute('style', 'display: none');
                })
                .catch((error) => {
                    console.log(error)
                    alertPublish.setAttribute('style', 'display: block');
                    alertPublish.innerHTML = 'Ocorreu um erro, tente novamente.';
                });
        } else {
            alertPublish.setAttribute('style', 'display: block');
            alertPublish.innerHTML = 'Por favor, escreva algo antes de publicar!';
        }
    });

    const mostrarPost = async () => {

        const arrayPost = await pegarPost();
        const postContainer = container.querySelector('#postContainer')
        postContainer.innerHTML = '';

        arrayPost.forEach((post) => {
            const postar = document.createElement('div')
            postar.innerHTML =

                ` <section class="conteudo">
                        <h3 class="nome"> ${post.name}</h3>
                        <p class="conteudoPag"> ${post.texto}</p>
                         <div class="btns">
                             <button class="btnLike" ${post.like.includes(auth.currentUser.uid) ? ' liked' : ''}" data-id="${post.id}">❤️</button>
                             <span class="contadorLike"> ${post.like.length}</span>
                             <button class="btnEditar" data-id="${post.id}"> ✏️ </button>
                             <button class="btnDeletar" data-id="${post.id}"> 🗑️ </button>
                         </div>
                    </section>
                    `

            postContainer.appendChild(postar)

            const btnLike = postar.querySelector('.btnLike')
            const contadorLike = postar.querySelector('.contadorLike')

            btnLike.addEventListener('click', async () => {
                const postId = btnLike.getAttribute('.data-id');
                
                try {

                    await likePost(db, postId, auth.currentUser.uid);
                    const atualizar = await getDoc(doc(db, 'posts', postId));
                    const atualizarLikes = atualizar.data().like.length;
                    contadorLike.textContent = atualizarLikes;


                    if (atualizar.data().like.includes(auth.currentUser.uid)) {
                        btnLike.classList.add('liked');
                    } else {
                        btnLike.classList.remove('liked');
                    }
                } catch (error) {
                    console.log('Error', error);


                }
            })





        });

        
    };
    mostrarPost()
    return container;

};