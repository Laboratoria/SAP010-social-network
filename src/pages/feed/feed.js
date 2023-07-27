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

export default async () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const dados = await getCurrentUser();
  console.log(dados);

  const renderPosts = async () => {
    console.log('Renderizando posts...');
    // const dados = await getCurrentUser();
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

      // O conteúdo da nova publicação, por exemplo:
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
          <img src=${excluir} alt="Excluir" title="Excluir">
        </div>
      </div>
    `;

      novoPostElement.innerHTML = postHtml;
      containerPostsElement.appendChild(novoPostElement);
    });
  };

  const containerPublicacaoPost = `
   <div class="containerPostVerde">
      <div class="nomeTipo">
        <strong>${dados.displayName}</strong>
        <p>Paciente</p>
      </div>
      <textarea class="text-area" name="postagem" id="text-mensagem" cols="30" rows="10"></textarea>
      <span class="erro" id="erro-post-vazio"></span>
      <button type="submit" id="btnPublicar" class="btnPubli">Publicar</button>
      </div>    
  `;

  const templateFeed = `
    <header>
      <nav>
        <a href="#perfil" id="feed" class="nome-usuario">${dados.displayName}</a>
      </nav>
      ${containerPublicacaoPost}
      <figure>
        <img id="ir-infopage" class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
      </figure>
    </header>    
   
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
  const erroMensagemVazia = containerFeed.querySelector('#erro-post-vazio');

  btnloguinho.addEventListener('click', () => {
    window.location.hash = '#infopage';
  });

  mensagemPost.addEventListener('input', () => {
    erroMensagemVazia.innerHTML = '';
  });

  btnPublicar.addEventListener('click', async () => {
    const msg = mensagemPost.value;
    if (mensagemPost.valuelength > 1) {
      await criarPost(msg);
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

  // Registrar a função handleHashChange para o evento hashchange
  // window.addEventListener('hashchange', handleHashChange);

  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#home';
  });

  return containerFeed;
};
