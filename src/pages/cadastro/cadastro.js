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
  <p class="erro" id="erro"></p>
  <input type="radio" id="paciente" class="opção" name="opcaoPerfil" value="paciente" checked >SOU PACIENTE</input>
  <input type="radio" id="prescritor" class="opção" name="opcaoPerfil" value="prescritor">SOU PRESCRITOR</input>
  <button type="submit" id="btnCriar" class="entrar centro" >CRIAR CONTA</button>
  
  </form
  </div>

  
  `;

  containerCadastro.innerHTML = templateCadastro;

  const nome = containerCadastro.querySelector('#nome');
  const email = containerCadastro.querySelector('#email');
  const senha = containerCadastro.querySelector('#senha');
  const confirmarSenha = containerCadastro.querySelector('#confirmarSenha');
  const btnCriar = containerCadastro.querySelector('#btnCriar');
  const mensagemErro = containerCadastro.querySelector('#erro');

  btnCriar.addEventListener('click', (e) => {
    e.preventDefault();
    if (nome.value === '') {
      mensagemErro.innerHTML = 'Preencha o campo nome!';
      return;
    }
    if (email.value === '') {
      mensagemErro.innerHTML = 'Preencha o campo email!';
      return;
    }
    if (senha.value === '') {
      mensagemErro.innerHTML = 'Preencha o campo senha!';
      return;
    }
    if (senha.value !== confirmarSenha.value) {
      mensagemErro.innerHTML = 'As senhas não conferem ';
      return;
    }
    // if (perfilPaciente.value === '' && perfilPrescritor.value === '') {
    //   mensagemErro.innerHTML = 'Selecione um perfil!';
    // }

    createUser(nome.value, email.value, senha.value)
      .then(() => {
      // usuário cadastrado com sucesso
        window.location.href = '/#perfil';
      })
      .catch((error) => {
        mensagemErro.innerHTML = 'não cadastrado';
        console.log(error);
      });
    // if (Auth.currentUser) {
    //   window.location.href = '#feed';
    /* aqui ele não está autenticando e já vai para a tela de feed */
    // .then((user) => {
    //   console.log(user);
    // }.catch((erro) => {
    //   mensagemErro.innerHTML = 'não cadastrado';
    //   console.log(erro);
  });
  return containerCadastro;
};

/* <a id="btnCriar" class="entrar centro" href="/#feed">CRIAR CONTA</a>  */
