import {
  loadPosts,
  createPost,
  getUsername,
  getCurrentUserId,
  getCurrentUser,
  deletePost,
  checkAuthor,
  editPostDoc,
  addLike,
  numberOfLikes,
  uploadPhoto,
} from '../../lib/firestore.js';
import { logout } from '../../lib/index.js';

import logo from '../../img/logo.png';
import userIcon from '../../img/usericon.png';
import signOut from '../../img/sign-out-alt.png';

export const feed = () => {
  const container = document.createElement('div');
  const templateFeed = `
      <header class='feed-header'>
      <div class='logo-sair-container'>
      <img src='${logo}' class='logo-repet' id='logo-repet-feed'></div>
      <div class='icon-welcome'> <img src='${userIcon}' alt='ícone de usuário' class='user-icon'/> 
      <p class='boas-vindas'>Seja bem-vindo(a) </p> <img src='${signOut}' class='btn-logout' id='btn-logout'></div>
      <a class='feedPage' href='/#feed'></a>

      <button id='post'>Crie seu post aqui!</button>
      </header>
      <section class='feed-page'></section>
      <div id='meuModal' class='modal'>
        <div class='modal-content'>
          <span class='fechar'>&times;</span>
       
          <form id='form-post'>
            <br>
            <div class="form-container">
            <div class="radio-container"> <div id="adotar-container">
            <input type='radio'  id='quero-adotar' name='quero' value='Quero adotar' required>
            <label for='quero-adotar'>Quero adotar</label></div>
           
            <div id="adotar-container"> 
            <input type='radio'  id='quero-doar' name='quero' value='Quero doar' required>
            <label for='quero-doar'>Quero doar</label></div>
            </div>
            
            <p id='mensagem-erro-radio' class='mensagem-erro'></p>
            
            <label for='especie' class='label-class'>Espécie:</label> 
            <select name='select' id='especie' class='modal-input-area'>
            <option value='' selected disabled >Selecionar</option>
            <option value='Cachorro'>Cachorro</option>
            <option value='Gato' >Gato</option>
            <option value='Outros'>Outros</option>
            </select>
 
            <label for='sexo' class='label-class'>Sexo:</label>
            <select name='select' id='sexo' class='modal-input-area'>
            <option value='' selected disabled >Selecionar</option>
            <option value='Fêmea'>Fêmea</option>
            <option value='Macho'>Macho</option>
            <option value='Sem Preferência'>Sem Preferência</option>
            </select>

            
            <label for='idade' class='label-class'>Idade do pet:</label>
            <select name='select' id='idade' class='modal-input-area'>
            <option value='' selected disabled >Selecionar</option>
            <option value='Filhote'>Filhote</option>
            <option value='Adulto'>Adulto</option>
            <option value='Idoso'>Idoso</option>
            <option value='Sem Preferência'>Sem Preferência</option>

                       
            </select>
            <label for='raca' class='label-class'>Raça:</label>
            <input type='text' class='modal-input-area' id='raca' name='raca' placeholder='Exemplo: Bulldog'>
            
            
            
            <label for='localização' class='label-class'>Localização:</label>
            <input type='text' class='modal-input-area' id='local' name='local' placeholder='Exemplo: Curitiba/PR'>
            
            <label for='contato' class='label-class'>Contato:</label>
            <input type='text' class='modal-input-area' id='contato' name='contato' placeholder='(xx) xxxxx-xxxx'>
            <label for='photo-input' class='label-class'>Foto:</label>
            <input type='file' id='photo-input' name='photo-input'> 
            
            <textarea id='mensagem' name='mensagem' rows='4' cols='20' required placeholder=' Escreva sua mensagem aqui.'></textarea>
           
            </div>
            <p id='mensagem-erro-textarea' class='mensagem-erro'></p>

            <div class='container-confirm'>
            <button type='submit' class='publicar' id='publicar'>Publicar</button>
            <button type='submit' class='editar' id='editar'>Editar</button>
            </div>
           
            </form>


        </div>
      </div>
    
  `;

  container.innerHTML = templateFeed;

  const limparFormulário = () => {
    document.getElementById('quero-doar').checked = false;
    document.getElementById('quero-adotar').checked = false;
    document.getElementById('idade').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('raca').value = '';
    document.getElementById('local').value = '';
    document.getElementById('contato').value = '';
    document.getElementById('mensagem').value = '';
    document.getElementById('mensagem-erro-radio').textContent = '';
    document.getElementById('mensagem-erro-textarea').textContent = '';
  };

  const loadFeed = async () => {
    const feedHeader = container.querySelector('.feed-header p');
    const currentUser = await getCurrentUser();
    const currentUserId = await getCurrentUserId();
    getUsername(currentUser, currentUserId).then((username) => {
      feedHeader.textContent += ` ${username}!`;
    });
    const posts = await loadPosts();

    const feedPage = container.querySelector('.feed-page');
    feedPage.innerHTML = '';

    posts.forEach(async (post) => {
      const postCard = document.createElement('div');
      postCard.innerHTML = `
        <section class='container-post'>
          <div class='post-header'>
            <div class='username'>${post.postUsername}</div>
            <div class='user-location'>${post.localizacao}</div>
          </div>
          <div class='adopt-option'>${post.opcaoAdocao}</div>
          <div class='post-inputs'>
            <div class='modal-input'>${post.idadePet}</div>
            <div class='modal-input'>${post.especie}</div>
            <div class='modal-input'>${post.sexo}</div>
            <div class='modal-input'>${post.raca}</div>
          </div>
          <div class='container-msg'>
           <p>${post.mensagem}
          </div>
           <img src="${post.imageUrl}" class='post-image' alt="Imagem do post"/></p>
          
          <p>Contato: ${post.contato}</p>

          <div class='icon-container'>
          <div class='like-counter'></div>
          <i class='material-icons like-icon' data-post-id='${post.id}'>thumb_up</i>
          <i class='material-icons delete-icon' data-post-id='${post.id}'>delete</i>
          <i class='material-icons edit-icon' data-post-id='${post.id}'>edit</i>
          </div>
          </section>
      `;

      const loadNumberOfLikes = async () => {
        const postId = post.id;
        const likeCounter = await numberOfLikes(postId);
        const likeNumber = postCard.querySelector('.like-counter');
        likeNumber.textContent = `${likeCounter}`;
        console.log('feed', likeCounter);
      };

      loadNumberOfLikes();

      const likeIcon = postCard.querySelector('.like-icon');

      likeIcon.addEventListener('click', async (event) => {
        event.preventDefault();
        const postId = post.id;
        const newLike = currentUserId;
        await addLike(postId, newLike);
        loadNumberOfLikes();
      });

      const editIcon = postCard.querySelector('.edit-icon');

      editIcon.addEventListener('click', async () => {
        const postId = post.id;
        const isAuthor = await checkAuthor(postId, currentUserId);
        console.log(isAuthor);

        if (isAuthor) {
          const modal = document.getElementById('meuModal');

          const submitButtonModal = document.getElementById('publicar');
          submitButtonModal.style.visibility = 'hidden';

          const editButtonModal = document.querySelector('.editar');
          editButtonModal.style.visibility = 'visible';

          const fechar = modal.querySelector('.fechar');
          fechar.onclick = function () {
            modal.style.display = 'none';
            submitButtonModal.style.visibility = 'visible';
            limparFormulário();
          };
          modal.style.display = 'block';

          document.getElementById('quero-doar').checked = post.opcaoAdocao === 'Quero doar';
          document.getElementById('quero-adotar').checked = post.opcaoAdocao === 'Quero adotar';
          document.getElementById('idade').value = post.idadePet;
          document.getElementById('especie').value = post.especie;
          document.getElementById('sexo').value = post.sexo;
          document.getElementById('raca').value = post.raca;
          document.getElementById('local').value = post.localizacao;
          document.getElementById('contato').value = post.contato;
          document.getElementById('mensagem').value = post.mensagem;

          const submitButton = document.getElementById('editar');

          submitButton.addEventListener('click', async (event) => {
            event.preventDefault();

            let opcao = '';
            if (document.getElementById('quero-doar').checked) {
              opcao = document.getElementById('quero-doar').value;
            } else if (document.getElementById('quero-adotar').checked) {
              opcao = document.getElementById('quero-adotar').value;
            }

            const opcaoAdocaoEdit = opcao;
            const idadeEdit = document.getElementById('idade').value;
            const especieEdit = document.getElementById('especie').value;
            const sexoEdit = document.getElementById('sexo').value;
            const racaEdit = document.getElementById('raca').value;
            const localizacaoEdit = document.getElementById('local').value;
            const contatoEdit = document.getElementById('contato').value;
            const mensagemEdit = document.getElementById('mensagem').value;

            await editPostDoc(
              postId,
              racaEdit,
              mensagemEdit,
              localizacaoEdit,
              idadeEdit,
              sexoEdit,
              especieEdit,
              opcaoAdocaoEdit,
              contatoEdit,
            );

            limparFormulário();

            modal.style.display = 'none';
            submitButtonModal.style.visibility = 'visible';

            window.location.reload();
          });
        }
      });

      // deletar post
      const deleteIcon = postCard.querySelector('.delete-icon');

      // chama a função checkAuthor e verifica todos os posts sendo gerados
      const isAuthor = await checkAuthor(post.id, currentUserId);

      if (isAuthor) {
        // verifica o retorno da função checkAuthor e exibe ou não o ícone da lixeira
        deleteIcon.style.visibility = 'visible';
        editIcon.style.visibility = 'visible';
      } else {
        deleteIcon.style.visibility = 'hidden';
        editIcon.style.visibility = 'hidden';
      }

      deleteIcon.addEventListener('click', async () => {
        if (isAuthor) {
          const confirmDelete = window.confirm(
            'Tem certeza que deseja excluir esta postagem?',
          );

          if (confirmDelete) {
            try {
              await deletePost(post.id);
              // Atualize o feed após a exclusão do post
              postCard.remove();
            } catch (error) {
              console.error('Erro ao deletar o post', error);
            }
          }
        }
      });

      feedPage.appendChild(postCard);
    });
  };

  loadFeed();

  container.querySelector('#btn-logout').addEventListener('click', () => {
    logout();
    window.location.hash = '#home';
  });

  container.querySelector('#post').addEventListener('click', () => {
    const modal = document.getElementById('meuModal');
    const fechar = modal.querySelector('.fechar');
    const editButtonModal = modal.querySelector('.editar');
    editButtonModal.style.visibility = 'hidden';

    // Ao clicar no botão, exibe o modal
    modal.style.display = 'block';

    // Ao clicar no botão de fechar, fecha o modal
    fechar.onclick = function () {
      modal.style.display = 'none';
    };
  });

  container
    .querySelector('#publicar')
    .addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        const file = document.getElementById('photo-input').files[0]
        const currentUser = await getCurrentUser();
        const currentUserId = await getCurrentUserId();
        const username = await getUsername(currentUser, currentUserId);

        let opcao = '';
        if (document.getElementById('quero-doar').checked) {
          opcao = document.getElementById('quero-doar').value;
        } else if (document.getElementById('quero-adotar').checked) {
          opcao = document.getElementById('quero-adotar').value;
        }

        const opcaoAdocao = opcao;
        const idadePet = document.getElementById('idade').value;
        const especie = document.getElementById('especie').value;
        const sexo = document.getElementById('sexo').value;
        const raca = document.getElementById('raca').value;
        const localizacao = document.getElementById('local').value;
        const contato = document.getElementById('contato').value;
        const mensagem = document.getElementById('mensagem').value;
        const dataAtual = Date.now();
        const postUsername = username;
        const postAuthorId = currentUserId;
        const postLikes = [];

        

        //  trecho para validação dos inputs de radio e textarea
        let validarInputs = true;
        const mensagemErroRadio = document.getElementById(
          'mensagem-erro-radio',
        );
        const mensagemErroTextarea = document.getElementById(
          'mensagem-erro-textarea',
        );

        if (
          !document.querySelector('input[type="radio"][name="quero"]:checked')
        ) {
          validarInputs = false;
          mensagemErroRadio.textContent = 'Campo obrigatório: favor selecionar uma opção.';
        }

        if (document.getElementById('mensagem').value === '') {
          validarInputs = false;
          mensagemErroTextarea.textContent = 'Campo obrigatório: favor inserir uma mensagem.';
          document.getElementById('mensagem').classList.add('error-border');
        } else {
          document.getElementById('mensagem').classList.remove('error-border');
        }

        if (validarInputs) {
          const imageUrl = await uploadPhoto(file);
          const dadosPost = {
            opcaoAdocao,
            idadePet,
            especie,
            sexo,
            raca,
            localizacao,
            contato,
            mensagem,
            imageUrl,
            dataAtual,
            postUsername,
            postAuthorId,
            postLikes,
          };

          await createPost(dadosPost);

          // Limpa os campos do formulário
          limparFormulário();

          // Recarrega o feed com a nova postagem
          window.location.reload();
          const modal = container.querySelector('#meuModal');

          modal.style.display = 'none';
        }
      } catch (error) {
        console.log(error);
      }
    });

  return container;
};
