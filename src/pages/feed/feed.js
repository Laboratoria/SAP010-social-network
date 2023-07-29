// feed.js
import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import coracao from '../imagens/icones/coracao.png';
import editar from '../imagens/icones/editar.png';
import excluir from '../imagens/icones/excluir.png';

import {
  criarPost, deslogar, getCurrentUser, fetchData, deletarPost,
} from '../serviceFirebase/firebaseAuth';

export default async () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const dados = await getCurrentUser();
  console.log(dados);

  // Obter o usuário logado
  const currentUser = await getCurrentUser();

  const renderPosts = async () => {
    console.log('Renderizando posts...');
    const posts = await fetchData();
    console.log(posts);

    const containerPostsElement = containerFeed.querySelector('#containerPosts');

    if (!containerPostsElement) {
      // Caso o elemento não exista, não há postagens para renderizar
      return;
    }

    // Limpar o conteúdo do container antes de renderizar novamente as postagens
    containerPostsElement.innerHTML = '';

    // // Obter o usuário logado
    // const currentUser = await getCurrentUser();

    // Agora, iteramos pelo array de posts e criamos os elementos para renderizar as postagens
    posts.forEach((postagem) => {
      const novoPostElement = document.createElement('div');
      novoPostElement.className = 'novo-post';
      novoPostElement.id = `post_${postagem.id}`; // Adicionar um ID único para o post

      // Verificar se o usuário logado é o mesmo do usuário associado ao post
      const isCurrentUserPost = currentUser && currentUser.uid === postagem.user_id;

      const postHtml = `
      <div id="containerPosts2" class="containerPostVerde">
        <div class="nomeTipo">
          <strong>${postagem.nome}</strong>
          <p>Paciente</p>
        </div>
        <div class="espacoBranco">
          <p>${postagem.mensagem}</p>
        </div>
        <div class="actionBtnPost">
          <img src=${coracao} alt="Curtir" title="Curtir">
          <img src=${editar} alt="Editar" title="Editar">
          ${isCurrentUserPost ? `<img src=${excluir} alt="Excluir" title="Excluir" data-post-id="${postagem.user_id}" class="excluirPostagem">`
    : ''
}
        </div>
      </div>
    `;

      novoPostElement.innerHTML = postHtml;
      containerPostsElement.appendChild(novoPostElement);

      // Event listener para o botão "Excluir", se existir
      // const btnExcluir = novoPostElement.querySelector('.excluirPostagem');
      // if (btnExcluir) {
      //   btnExcluir.addEventListener('click', async (e) => {
      //     e.preventDefault();
      //     const postId = e.currentTarget.dataset.postId;
      //     console.log('Clicou no botão de exclusão:', postId);
      //     await deletarPost(postId);
      //     await renderPosts(); // Atualizar a lista de posts após a exclusão
      //   });
      // }
    });
  };

  const containerPublicacaoPost = `
   <div class="containerPostVerde fixo">
      <div class="nomeTipo">
        <strong>${dados.displayName}</strong>
        <p>Paciente</p>
      </div>
      <textarea class="text-area" name="postagem" id="text-mensagem" cols="30" rows="10"></textarea>
      <img src=${excluir} alt="Excluir" title="Excluir" id="apagaTexto">
      <span class="erro" id="erro-post-vazio"></span>
      <button type="submit" id="btnPublicar" class="btnPubli">Publicar</button>
      </div>    
  `;

  const templateFeed = `
    <header class='header'>
      <nav>
        <a href="#perfil" id="feed" class="nome-usuario">${dados.displayName}</a>
      </nav>
      <figure>
        <img id="ir-infopage" class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
      </figure>
    </header>    
    ${containerPublicacaoPost}
      <div id="containerPosts" class="containerVerdeFeed">
      </div>

    <footer class="footer">
      <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
      <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
      <img class="iconesFooter" id="iconeSair" src=${sair} alt="icone sair" title="Ícone para Deslogar">
    </footer>
  `;

  containerFeed.innerHTML = templateFeed;

  const mensagemPost = containerFeed.querySelector('#text-mensagem');
  const btnloguinho = containerFeed.querySelector('#ir-infopage');
  const btnPublicar = containerFeed.querySelector('#btnPublicar');
  const btnDeslogar = containerFeed.querySelector('#iconeSair');
  const btnApagaTexto = containerFeed.querySelector('#apagaTexto');
  const erroMensagemVazia = containerFeed.querySelector('#erro-post-vazio');
  // const btnExcluirPostagem = containerFeed.querySelector('.excluirPostagem');

  btnloguinho.addEventListener('click', () => {
    window.location.hash = '#infopage';
  });

  mensagemPost.addEventListener('input', () => {
    erroMensagemVazia.innerHTML = '';
  });

  const limpaTextarea = () => {
    mensagemPost.value = '';
  };
  btnApagaTexto.addEventListener('click', limpaTextarea);

  btnPublicar.addEventListener('click', async () => {
    const msg = mensagemPost.value;
    if (mensagemPost.value.length > 1) {
      await criarPost(msg, currentUser.uid);
      mensagemPost.value = '';
      // erroMensagemVazia.innerHTML = ''; // Limpar a mensagem de erro
      // Renderizar novamente as postagens após criar uma nova
      await renderPosts();
    } else {
      erroMensagemVazia.innerHTML = 'Insira um mensagem para ser publicada';
      console.log('mensagem vazia');
    }
  });

  // Renderizar as postagens no carregamento inicial da página
  await renderPosts();

  // btnExcluirPostagem.addEventListener('click', async (e) => {
  //   const idPostagem = e.currentTarget.dataset.idPostagem;
  //   await deletarPost(idPostagem);
  //   await renderPosts();
  // });

  containerFeed.addEventListener('click', (event) => {
    const target = event.target;
    const deleteButton = target.closest('.excluirPostagem');
    if (deleteButton) {
      const postId = deleteButton.getAttribute('data-post-id');
      if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
        deletarPost(postId)
          .then(() => {
            deleteButton.closest('.novo-post').remove();
            alert('Publicação excluída com sucesso!');
          })
          .catch((error) => {
            alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde', error);
          });
      }
    }
  });
  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#home';
  });

  return containerFeed;
};
