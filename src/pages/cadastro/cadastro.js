import './cadastro.css';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';

export default () => {
  const containerCadastro = document.createElement('section');
  containerCadastro.classList.add('container-cadastro');

  const templateCadastro = `

  <figure><img class="img-CBD1" src=${CBD} alt="logo app" title="Logo CBD Connection"></figure>
  <div class="container">
  <nav>
  <a href="#login" id="login" class="texto1 centro">Já possuo uma conta</a>
  </nav>
  <form>
  <input type="text" id="nome" class="input centro" placeholder="NOME" required>
  <input type="email" id="email" class="input centro" placeholder="E-MAIL" required> 
  <input type="password" id="senha" class="input centro" placeholder="SENHA" required>
  <input type="password" id="confirmarSenha" class="input centro" placeholder="CONFIRMAR SENHA" required>
  <input type="radio" id="paciente" class="opção" name="opcaoPerfil" value="paciente">SOU PACIENTE</input>
  <input type="radio" id="prescritor" class="opção" name="opcaoPerfil" value="prescritor">SOU PRESCRITOR</input>
  <a id="btnCriar" class="entrar centro" href="/#feed">CRIAR CONTA</a> 
  </form>
  </div>

  
  `;

  containerCadastro.innerHTML = templateCadastro;

  return containerCadastro;
};
