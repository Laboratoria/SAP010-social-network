import './novoPost.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';

export default () => {
  const containerNovoPost = document.createElement('section');
  containerNovoPost.classList.add('container-novoPost');
  // const time = this.getTime();

  const templateNovoPost = `
  <figure><img class="img-loguinho" src=${loguinho} alt="logo app" title="Logo CBD Connection"></figure>
  <p> Tela nova Postagem </p>

  

   <footer>
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
  <a href="#home" id="iconeSair"><img class="iconesFooter" src=${sair} alt="icone sair" title="Ícone para Deslogar"></a>
  </footer>

  `;

  containerNovoPost.innerHTML = templateNovoPost;

  // getTime() {
  //   const time = new Date();
  //   const hour = time.getHours();
  //   const minutes = time.getMinutes();
  //   return `${hour}h ${minutes}min`;
  // }

  return containerNovoPost;
};
