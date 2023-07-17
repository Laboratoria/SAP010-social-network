import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import coracao from '../imagens/icones/coracao.png';
import editar from '../imagens/icones/editar.png';
import excluir from '../imagens/icones/excluir.png';

export default () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const templateFeed = `
  <header>
  <nav>
    <a href="#perfil" id="feed" class="centro nome-usuario">Nome</a>
  </nav>
  <figure>
    <img id="ir-infopage" class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
  </figure>
</header>

  <p>Tela de Feed </p>
  <span class="tipoUsuario1"></span>
  <div class="containerVerdeFeed">
  <span class="nomeUsuario"></span>
  <span class="tipoUsuario"></span>
  </div>
  <div class="containerPostVerde">

          <div class="nomeTipo">
            <strong>Usuário</strong>
            <p>tipo</p>
          </div>

             <textarea name="postagem" id="text-mensagem" cols="30" rows="10"></textarea>

          <button type="submit" id="btnPublicar" class="entrar centro">Publicar</button>

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
        </div>
  </div>
  <footer>
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
  <a href="#home" id="iconeSair"><img class="iconesFooter" src=${sair} alt="icone sair" title="Ícone para Deslogar"></a>
  </footer>


  `;

  containerFeed.innerHTML = templateFeed;

  const mensagemPost = containerFeed.querySelector('#text-mensagem');
  const btnloguinho = containerFeed.querySelector('#ir-infopage');
  const btnPublicar = containerFeed.querySelector('#btnPublicar');

  btnloguinho.addEventListener('click', () => {
    window.location.hash = '#infopage';
  });

  btnPublicar.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = mensagemPost.value;
    console.log(msg);
  });

  return containerFeed;
};
