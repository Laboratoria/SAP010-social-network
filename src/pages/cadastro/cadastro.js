import './cadastro.css';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';
import { createUser } from '../serviceFirebase/firebaseAuth.js';

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
<<<<<<< HEAD
  <input type="radio" id="paciente" name="opcaoPerfil" value="paciente">SOU PACIENTE</input>
  <input type="radio" id="prescritor" name="opcaoPerfil" value="prescritor">SOU PRESCRITOR</input>
  <button id="btnCriar" class="entrar centro" >CRIAR CONTA</button> 
=======
  <input type="radio" id="paciente" class="opção" name="opcaoPerfil" value="paciente">SOU PACIENTE</input>
  <input type="radio" id="prescritor" class="opção" name="opcaoPerfil" value="prescritor">SOU PRESCRITOR</input>
  <a id="btnCriar" class="entrar centro" href="/#feed">CRIAR CONTA</a> 
>>>>>>> b93c1e8ee1ee5dc20e073e70e0ba75d487bcce9b
  </form>
  </div>

  
  `;

  containerCadastro.innerHTML = templateCadastro;

  const nome = containerCadastro.getElementById('nome');
  const email = containerCadastro.getElementById('email');
  const senha = containerCadastro.getElementById('senha');
  const confirmarSenha = containerCadastro.getElementById('confirmarSenha');
  const btnCriar = containerCadastro.getElementById('btnCriar');

  btnCriar.addEventListener('click', (e) => {
    e.preventDefault();
    if (senha.value !== confirmarSenha.value) {
      alert('As senhas não conferem'); /* tirar o alert */
      return;
    }
    createUser(nome.value, email.value, senha.value).then((user) => {
      console.log(user);
    });
  });

  return containerCadastro;
};
