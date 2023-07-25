import './cadastro.css';

import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';
import { createUser, atualizaPerfil } from '../serviceFirebase/firebaseAuth.js';

export default () => {
  const containerCadastro = document.createElement('section');
  containerCadastro.classList.add('container-cadastro');

  const templateCadastro = `

  <figure><img class="img-CBD1" src=${CBD} alt="logo app" title="Logo CBD Connection"></figure>
  <div class="container">
  <nav>
  <a href="#login" id="retornaLogin" class="texto1 centro">Já possuo uma conta</a>
  </nav>
  <form>
  <input type="text" id="nome" class="input centro" placeholder="NOME" required>
  <span class="erro" id="erro-nome"></span>

  <input type="email" id="email" class="input centro" placeholder="E-MAIL" required> 
  <span class="erro" id="erro-email"></span>

  <input type="password" id="senha" class="input centro" placeholder="SENHA" required>
  <span class="erro" id="erro-senha"></span>

  <input type="password" id="confirmarSenha" class="input centro" placeholder="CONFIRMAR SENHA" required>
  <span class="erro" id="erro-confirmarsenha"></span>
  <p class="erro" id="erro-cadastro"></p>

  <input type="radio" id="paciente" class="opção" name="opcaoPerfil" value="paciente" checked >SOU PACIENTE
  <input type="radio" id="prescritor" class="opção" name="opcaoPerfil" value="prescritor">SOU PRESCRITOR

  

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
  const mensagemErro = containerCadastro.querySelector('#erro-cadastro');

  btnCriar.addEventListener('click', (e) => {
    e.preventDefault();
    const erronome = document.getElementById('erro-nome');
    if (nome.value.length < 1) {
      erronome.innerHTML = 'Preencha o campo nome!';
      nome.classList.add('borda-vermelha');
    } else {
      erronome.hidden = true;
      nome.classList.remove('borda-vermelha');
    }

    nome.addEventListener('focus', () => {
      erronome.hidden = true;
      nome.classList.remove('borda-vermelha');
    });

    const erroemail = document.getElementById('erro-email');
    if (email.value.length < 1) {
      erroemail.innerHTML = 'Preencha o campo email!';
      email.classList.add('borda-vermelha');
    } else {
      erroemail.hidden = true;
      email.classList.remove('borda-vermelha');
    }

    email.addEventListener('focus', () => {
      erroemail.hidden = true;
      email.classList.remove('borda-vermelha');
    });

    const errosenha = document.getElementById('erro-senha');
    if (senha.value.length < 1) {
      errosenha.innerHTML = 'Preencha o campo senha!';
      senha.classList.add('borda-vermelha');
    } else {
      errosenha.hidden = true;
      senha.classList.remove('borda-vermelha');
    }

    senha.addEventListener('focus', () => {
      errosenha.hidden = true;
      senha.classList.remove('borda-vermelha');
    });

    const erroconfirmarsenha = document.getElementById('erro-confirmarsenha');
    if (senha.value !== confirmarSenha.value) {
      confirmarSenha.classList.add('borda-vermelha');
      erroconfirmarsenha.innerHTML = 'As senhas não conferem';
    } else {
      erroconfirmarsenha.hidden = true;
      confirmarSenha.classList.remove('borda-vermelha');
    }

    confirmarSenha.addEventListener('focus', () => {
      erroconfirmarsenha.hidden = true;
      confirmarSenha.classList.remove('borda-vermelha');
    });

    createUser(nome.value, email.value, senha.value)
      .then(() => {
        atualizaPerfil(nome.value);
        // usuário cadastrado com sucesso
        window.location.href = '/#perfil';
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          mensagemErro.innerHTML = 'Este e-mail já foi utilizado';
        } else {
          mensagemErro.innerHTML = 'Usuário não cadastrado';
          console.log(error);
        }
      });
  });
  return containerCadastro;
};
