import './perfil.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import voltar from '../imagens/icones/voltar.png';

export default () => {
  const containerPerfil = document.createElement('section');
  containerPerfil.classList.add('container-perfil');

  const templatePerfil = `
  <a href="#infopage" id="iconeLoguinho">
  <figure><img id="ir-infopage1'" class="img-loguinho" src=${loguinho} alt="logo app" title="Logo CBD Connection"></figure>
  </a>
  <p> Tela de Perfil </p>

 <a href="#feed" id="iconeVoltar"><img src=${voltar} alt="icone voltar" title="Ícone para Voltar"></a>

   <footer>
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
  <a href="#home" id="iconeSair"><img class="iconesFooter" src=${sair} alt="icone sair" title="Ícone para Deslogar"></a>
  </footer>

  `;

  containerPerfil.innerHTML = templatePerfil;

  // const btnloguinho = containerPerfil.querySelector('#ir-infopage1');

  // btnloguinho.addEventListener('click', () => {
  //   window.location.hash = '#infopage';
  // });

  return containerPerfil;
};
