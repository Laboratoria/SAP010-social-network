import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';

export default () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const templateFeed = `
  <header>
  <nav>
    <a href="#perfil" id="feed" class="centro nome-usuario">Nome</a>
  </nav>
  <figure>
    <img class="img-loguinho" src=${loguinho} alt="Logo app" title="Logo CBD Connection">
  </figure>
</header>

  <p>Tela de Feed </p>
  <span class="tipoUsuario1"></span>
  <div class="containerVerdeFeed">
  <span class="nomeUsuario"></span>
  <span class="tipoUsuario"></span>
  </div>
  <footer>
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
  <a href="#home" id="iconeSair"><img class="iconesFooter" src=${sair} alt="icone sair" title="Ícone para Deslogar"></a>
  </footer>


  `;

  containerFeed.innerHTML = templateFeed;

  return containerFeed;
};
