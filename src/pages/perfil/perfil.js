import './perfil.css';
import loguinho from '../imagens/CBDCNNCT-IMG/logologuinhamobilefeed.png';
import perfil from '../imagens/icones/perfil.png';
import novoPost from '../imagens/icones/novoPost.png';
import sair from '../imagens/icones/sair.png';
import voltar from '../imagens/icones/voltar.png';
import imgPerfil from '../imagens/icones/imgPerfil.png';
import { usuarioAtual } from '../serviceFirebase/firebaseAuth';

export default async () => {
  const containerPerfil = document.createElement('section');
  containerPerfil.classList.add('container-perfil');
  const dados = await usuarioAtual();
  console.log(dados);

  const templatePerfil = `
 <header>
  <nav class="icones-header">
 <a href="#feed" class="img-voltar" id="iconeVoltar"><img src=${voltar} alt="icone voltar" title="Ícone para Voltar"></a>
  <a href="#infopage" id="iconeLoguinho">
  <figure><img id="ir-infopage1'" class="img-loguinhoP" src=${loguinho} alt="logo app" title="Logo CBD Connection"></figure>
  </a>  
  </nav>
  </header>
  <section class= "dados-usuario">
  <figure><img id="perfil" class="img-perfil" src=${imgPerfil} alt="Imagem de Perfil" title="Sua foto de Perfil"></figure>
  <p> MEU PERFIL </p>
  <p> SOU PACIENTE </p>
 
  <div>
  <p class="input centro"> ${dados.displayName} </p>
  <p class="input centro"> ${dados.email} </p>
  </div>
  </section>

   <footer>
  <a href="#perfil" id="iconePerfil"><img class="iconesFooter" src=${perfil} alt="icone perfil" title="Ícone Perfil"></a>
  <a href="#novoPost" id="iconeNovoPost"><img class="iconesFooter" src=${novoPost} alt="icone criar nova postagem" title="Ícone para Nova Postagem"></a>
  <a href="#home" id="iconeSair"><img class="iconesFooter" src=${sair} alt="icone sair" title="Ícone para Deslogar"></a>
  </footer>

  `;

  containerPerfil.innerHTML = templatePerfil;

  return containerPerfil;
};
