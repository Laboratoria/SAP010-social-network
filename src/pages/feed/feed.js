import './feed.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import coracao from '../imagens/icones/coracao.png';
import editar from '../imagens/icones/editar.png';
import excluir from '../imagens/icones/excluir.png';

import { criarPost, deslogar } from '../serviceFirebase/firebaseAuth';

export default () => {
  const containerFeed = document.createElement('section');
  containerFeed.classList.add('container-feed');

  const templateFeed = `
  <header>
  <nav>
    <a href="#perfil" id="feed" class="nome-usuario">Imagem e Nome</a>
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

  const containerPost = `<span class="tipoUsuario1"></span>
  <div class="containerVerdeFeed">
  <span class="NomeUsuario"></span>
  <span class="tipoUsuario"></span>
  </div>
  <div class="containerPostVerde">

          <div class="nomeTipo">
            <strong>Usuário</strong>
            <p>tipo</p>
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

  btnPublicar.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = mensagemPost.value;
    console.log(msg);
    criarPost(msg);
  });

  btnDeslogar.addEventListener('click', async () => {
    await deslogar();
    console.log('deslogou');
    window.location.href = '#home';
  });

  return containerFeed;
};
