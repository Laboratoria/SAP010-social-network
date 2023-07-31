import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import coracao from '../imagens/icones/coracao.png';
import editar from '../imagens/icones/editar.png';
import excluir from '../imagens/icones/excluir.png';

import {
  criarPost, deslogar, usuarioAtual, fetchData, deletarPost,
  editarPost,
} from '../serviceFirebase/firebaseAuth';

export default async () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const dadosUsuarioLogado = await usuarioAtual();
  console.log(dadosUsuarioLogado);

  // Obter o usuário logado
  // const currentUser = await usuarioAtual();

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

    // Agora, iteramos pelo array de posts e criamos os elementos para renderizar as postagens
    posts.forEach((postagem) => {
      const novoPostElement = document.createElement('div');
      novoPostElement.className = 'novo-post';
      novoPostElement.id = `post_${postagem.id}`; // Adicionar um ID único para o post

      // Verificar se o usuário logado é o mesmo do usuário associado ao post
      const postUsuarioLogado = dadosUsuarioLogado && dadosUsuarioLogado.uid === postagem.user_id;

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
          ${postUsuarioLogado ? `<img src=${editar} alt="Editar" title="Editar" data-post-id="${postagem.id}" class="editarPostagem">` : ''}
          ${postUsuarioLogado ? `<img src=${excluir} alt="Excluir" title="Excluir" data-post-id="${postagem.id}" class="excluirPostagem">`
    : ''
}
        </div>
      </div>
    `;
      console.log('Id da postagem:', postagem.id);
      novoPostElement.innerHTML = postHtml;
      containerPostsElement.appendChild(novoPostElement);
    });
  };

  const containerPublicacaoPost = `
   <div class="containerPostVerde">
      <div class="nomeTipo">
        <strong>${dadosUsuarioLogado.displayName}</strong>
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
        <a href="#perfil" id="feed" class="nome-usuario">${dadosUsuarioLogado.displayName}</a>
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
    const mensagem = mensagemPost.value;
    if (mensagem.length > 1) {
      await criarPost(mensagem, dadosUsuarioLogado.uid);
      mensagemPost.value = '';
      await renderPosts(); // Atualizar a lista de posts após criar uma nova
    } else {
      erroMensagemVazia.innerHTML = 'Insira um mensagem para ser publicada';
      console.log('mensagem vazia');
    }
  });

  containerFeed.addEventListener('click', (event) => {
    const target = event.target;
    const btnDeletar = target.closest('.excluirPostagem');
    const btnEditar = target.closest('.editarPostagem');
    if (btnDeletar) {
      const postId = btnDeletar.getAttribute('data-post-id');
      console.log('Id da postagem:', postId); // Mostra o ID da postagem no console
      if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
        deletarPost(postId)
          .then(() => {
            btnDeletar.closest('.novo-post').remove();
            alert('Publicação excluída com sucesso!');
          })
          .catch((error) => {
            alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde', error);
          });
      }
    }

    if (btnEditar) {
      const postId = btnEditar.getAttribute('data-post-id');
      const elementoPost = btnEditar.closest('.novo-post');
      const mensagemDoPost = elementoPost.querySelector('.espacoBranco p').textContent;
      const novaMensagem = window.prompt(`Editar Post: ${mensagemDoPost}`);
      editarPost(postId, novaMensagem)
        .then(() => {
          btnEditar.closest('.novo-post').textContent = novaMensagem;
          alert('Publicação editada com sucesso!');
          renderPosts();
        })
        .catch((error) => {
          alert('Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde', error);
        });
    }
  });

  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#login';
  });

  renderPosts();

  return containerFeed;
};
