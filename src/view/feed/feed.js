import {
  carregarPosts,
  criarPost,
  getUsername,
  getCurrentUser,
  // getCurrentUserId,
  deletePost,
} from '../../lib/firestore.js';
import { logout } from '../../lib/index.js';

export const feed = () => {
  const container = document.createElement('div');
  const templateFeed = `
      <header class="feed-header">
      <div class='logo-sair-container'>
      <img src="../../img/logo.png" class="logo-repet" id="logo-repet-feed"> <button id="sair"> Sair </button> </div>
      <div class="icon-welcome"> <img src="../../img/usericon.png" alt="ícone de usuário" class="user-icon"/> 
      <p class="boas-vindas">Seja bem-vindo(a) </p> </div>
      <a class="feedPage" href="/#feed"></a>

      <button id="post">Crie seu post aqui!</button>
      </header>
      <section class="feed-page"></section>
      <div id="meuModal" class="modal">
        <div class="modal-content">
          <span class="fechar">&times;</span>
       
          <form id="form-post">
            <br>
            
            <input type="radio"  id="quero-adotar" name="quero" value="Quero adotar" required>
            <label for="quero-adotar">Quero adotar</label>
           
            <input type="radio"  id="quero-doar" name="quero" value="Quero doar" required>
            <label for="quero-doar">Quero doar</label>
            <br>
            <p id="mensagem-erro-radio" class="mensagem-erro"></p>
            
            <label for="especie" class="label-class">Espécie:</label> 
            <select name="select" id="especie" class="modal-input-area">
            <option value="" selected disabled >Selecionar</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato" >Gato</option>
            <option value="Outros">Outros</option>
            </select>
 
            <label for="sexo" class="label-class">Sexo:</label>
            <select name="select" id="sexo" class="modal-input-area">
            <option value="" selected disabled >Selecionar</option>
            <option value="Fêmea">Fêmea</option>
            <option value="Macho">Macho</option>
            <option value="Sem Preferência">Sem Preferência</option>
            </select>

            <br>
            <label for="idade" class="label-class">Idade do pet:</label>
            <select name="select" id="idade" class="modal-input-area">
            <option value="" selected disabled >Selecionar</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
            <option value="Idoso">Idoso</option>
            <option value="Sem Preferência">Sem Preferência</option>

                       
            </select>
            <label for="raca" class="label-class">Raça:</label>
            <input type="text" class="modal-input-area" id="raca" name="raca" placeholder="Exemplo: Bulldog">
            <br>
            
            
            <label for="localização" class="label-class">Localização:</label>
            <input type="text" class="modal-input-area" id="local" name="local" placeholder="Exemplo: Curitiba/PR">
            
            <label for="contato" class="label-class">Contato:</label>
            <input type="text" class="modal-input-area" id="contato" name="contato" placeholder="(xx) xxxxx-xxxx">
            <br>
            <textarea id="mensagem" name="mensagem" rows="4" cols="20" required placeholder=" Escreva sua mensagem aqui."></textarea>
            <br>

            <p id="mensagem-erro-textarea" class="mensagem-erro"></p>

            <button type="submit" class="publicar" id="publicar">Publicar</button>

            </form>


        </div>
      </div>
    
  `;

  container.innerHTML = templateFeed;

  const feedHeader = container.querySelector('.feed-header p');

  getUsername().then((username) => {
    feedHeader.textContent += ` ${username}!`;
  });

  const carregarFeed = async () => {
    const currentUser = await getCurrentUser();
    console.log('usuário atual', currentUser);

    const posts = await carregarPosts();

    const feedPage = container.querySelector('.feed-page');
    feedPage.innerHTML = '';

    posts.forEach(async (post) => {
      const postCard = document.createElement('div');
      postCard.innerHTML = `
        <section class='container-post'>
          <div class='post-header'>
            <div class="username">${post.postUsername}</div>
            <div class="user-location">${post.localizacao}</div>
          </div>
          <div class='adopt-option'>${post.opcaoAdocao}</div>
          <div class='post-inputs'>
            <div class="modal-input">${post.idadePet}</div>
            <div class="modal-input">${post.especie}</div>
            <div class="modal-input">${post.sexo}</div>
            <div class="modal-input">${post.raca}</div>
          </div>
          <div class='container-msg'>
           <p>${post.mensagem}</p>
          </div>
          <p>Contato: ${post.contato}</p>
         
          <i class="material-icons" data-post-id="${post.id}">delete</i>
          </section>
      `;

      const deleteIcon = postCard.querySelector('.material-icons');
      deleteIcon.addEventListener('click', async () => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir esta postagem?');
        if (confirmDelete) {
          try {
            await deletePost(post.id);
            // Atualize o feed após a exclusão do post
            postCard.remove();
          } catch (error) {
            console.error('Erro ao deletar o post', error);
          }
        }
      });

      feedPage.appendChild(postCard);
    });
  };

  carregarFeed();

  container.querySelector('#sair').addEventListener('click', () => {
    logout();
  });

  container.querySelector('#post').addEventListener('click', () => {
    const modal = document.getElementById('meuModal');
    const fechar = modal.querySelector('.fechar');

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
        const username = await getUsername();
        // const currentUserId = await getCurrentUserId();
        console.log('Nome de usuário:', username);

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
        // const postId = currentUserId;

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
          const dadosPost = {
            opcaoAdocao,
            idadePet,
            especie,
            sexo,
            raca,
            localizacao,
            contato,
            mensagem,
            dataAtual,
            postUsername,
            // postId,
          };
          await criarPost(dadosPost);

          // Limpa os campos do formulário
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

          // Recarrega o feed com a nova postagem
          await carregarFeed();
          const modal = container.querySelector('#meuModal');

          modal.style.display = 'none';
        }
      } catch (error) {
        console.log(error);
      }
    });

  return container;
};
