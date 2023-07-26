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
  criarPost, deslogar, getCurrentUser, fetchData,
} from '../serviceFirebase/firebaseAuth';

const renderPosts = async () => {
  console.log('Renderizando posts...');
  const dados = await getCurrentUser();
  const posts = await fetchData();
  console.log(posts);

  const containerPosts = document.getElementById('containerPosts');

  if (!containerPosts) {
    // Caso o elemento não exista, não há postagens para renderizar
    return;
  }

  // Limpar o conteúdo do container antes de renderizar novamente as postagens
  containerPosts.innerHTML = '';

  // Agora, iteramos pelo array de posts e criamos os elementos para renderizar as postagens
  posts.forEach((postagem) => {
    const novoPostElement = document.createElement('div');
    novoPostElement.className = 'novo-post';

    // O conteúdo da nova publicação, por exemplo:
    const postHtml = `
      <div id="containerPosts2" class="containerPostVerde">
        <div class="nomeTipo">
          <strong>${dados.displayName}</strong>
          <p>Paciente</p>
        </div>
        <div class="espacoBranco">
          <p>${postagem.mensagem}</p>
        </div>
        <div class="actionBtnPost">
          <img src=${coracao} alt="Curtir" title="Curtir">
          <img src=${editar} alt="Editar" title="Editar">
          <img src=${excluir} alt="Excluir" title="Excluir">
        </div>
      </div>
    `;

    novoPostElement.innerHTML = postHtml;
    containerPosts.prepend(novoPostElement);
  });
};

const handleHashChange = async () => {
  // Renderizar as postagens sempre que a hash mudar
  await renderPosts();
};

export default async () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const dados = await getCurrentUser();
  console.log(dados);

  const templateFeed = `
    <header>
      <nav>
        <a href="#perfil" id="feed" class="nome-usuario">Imagem ${dados.displayName}</a>
      </nav>
      <figure>
        <img id="ir-infopage" class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
      </figure>
    </header>

    <footer class="footer">
      <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
      <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
      <img class="iconesFooter" id="iconeSair" src=${sair} alt="icone sair" title="Ícone para Deslogar">
    </footer>
  `;

  const containerPost = `
    <span class="tipoUsuario1"></span>
    <div id="containerPosts" class="containerVerdeFeed">
      <span class="NomeUsuario"></span>
      <span class="tipoUsuario"></span>
    </div>
    <div class="containerPostVerde">
      <div class="nomeTipo">
        <strong>${dados.displayName}</strong>
        <p>Paciente</p>
      </div>
      <textarea class="text-area" name="postagem" id="text-mensagem" cols="30" rows="10"></textarea>
      <div class="actionBtnPost">
        <button type="button" class="filesPost like">
          <img src=${coracao} alt="Curtir" title="Curtir">
        </button>
        <button type="button" class="filesPost editar">
          <img src=${editar} alt="Editar" title="Editar">
        </button>
        <button type="button" class="filesPost share">
          <img src=${excluir} alt="Excluir" title="Excluir">
        </button>
        <button type="submit" id="btnPublicar" class="btnPubli">Publicar</button>
      </div>
    </div>
  `;

  containerFeed.innerHTML = templateFeed + containerPost;

  const mensagemPost = containerFeed.querySelector('#text-mensagem');
  const btnloguinho = containerFeed.querySelector('#ir-infopage');
  const btnPublicar = containerFeed.querySelector('#btnPublicar');
  const btnDeslogar = containerFeed.querySelector('#iconeSair');

  btnloguinho.addEventListener('click', () => {
    window.location.hash = '#infopage';
  });

  btnPublicar.addEventListener('click', async (e) => {
    e.preventDefault();
    const msg = mensagemPost.value;
    console.log(msg);
    await criarPost(msg);

    // Renderizar novamente as postagens após criar uma nova
    await renderPosts();

    // Limpar o valor da mensagem no textarea
    mensagemPost.value = '';
  });

  // Renderizar as postagens no carregamento inicial da página
  await renderPosts();

  // Registrar a função handleHashChange para o evento hashchange
  window.addEventListener('hashchange', handleHashChange);

  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#home';
  });

  return containerFeed;
};
