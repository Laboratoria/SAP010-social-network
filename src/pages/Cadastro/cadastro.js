import { cadastroUsuarioSenha } from '../../lib/authUser.js';
import {updateProfile} from 'firebase/auth';

export default () => {
  const oldStyles = document.getElementsByTagName("link");
  if(oldStyles.length > 1) oldStyles[1].remove();
  const stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href','pages/Cadastro/cadastro.css');
  document.head.appendChild(stylesheet);

  const cadastroContainer = document.createElement('div');
  const templateCadastro = `<div id="loginBackground"></div><div> 
  <header>
    <picture><img class="logo" src="./img/logo_contraplano.png"></picture>
  </header>
  <div>
    <h2>Bem vinde a sua rede social de filmes</h2>
  </div>
    <form action="">
      <fieldset>
        <legend>Cadastre-se</legend>
        <div>
          <label for="nome" id="nome">Nome</label>
          <input type="text" class="nome" id="nome">
        </div>
        <div>
          <label for="usuario" id="usuario">Usuário
          <input type="text" class="usuario" id="usuario">
          </label>
        </div>
        <div>
        <label for="email" id="emailLabel">
          <span></span>
          <p>Email</p>
          <input type="text" name="email" class="email" id="email">
        </label>
        </div>
        <div>
          <label for="senha" id="senha">Senha</label>
          <input type="password" class="senha" id="senha">
        </div>
        <button class="btn" id="btn-cad-voltar">Voltar</button>
        <button class="btn" id="btn-cad-concluir">Concluir cadastro</button>
        <div id="errorMessage" class="error">
      </fieldset>
    </form>
  <footer>
    <h5>Bootcamp Laboratoria - Projeto Rede Social</h5>
    <h6>Desenvolvido por Larissa, Maila e Vitória</h6>
    <p>2023</p>
  </footer></div>`;

  cadastroContainer.id = 'login'; // CSS
  cadastroContainer.innerHTML = templateCadastro;

  // Informações preenchidas pelo usuário

  const nomeUsuarioEntrada = cadastroContainer.querySelector('#usuario');
  const emailEntrada = cadastroContainer.querySelector('#email');
  const senhaEntrada = cadastroContainer.querySelector('#senha');

  // Botões para cadastrar
  const botaoCadastrar = cadastroContainer.querySelector('#btn-cad-concluir');
  const botaoVoltar = cadastroContainer.querySelector('#btn-cad-voltar');

  // Função Registrar
  const registerUser = (event) => {
    event.preventDefault();
    const usuario = nomeUsuarioEntrada.value;
    const email = emailEntrada.value;
    const senha = senhaEntrada.value;

    // Chamada para a função createUserWithEmail
    cadastroUsuarioSenha(email, senha)
      .then(
        (userCredential) => {
          const user = userCredential.user;
          window.location.hash = '#feed';
          //window.location.reload();
          updateProfile(user, {
            displayName: `${usuario}`,
          });
        },
      )
      .catch((error) => {
        // Lidar com erros durante o cadastro
        const errorMessage = cadastroContainer.querySelector('#errorMessage');
        errorMessage.style.display = 'block';
        switch (error.code) {
          case 'auth/missing-email':
            errorMessage.textContent = 'Preencha o e-mail!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/email-already-in-use':
            errorMessage.textContent = 'E-mail já está em uso!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/missing-password':
            errorMessage.textContent = 'Preencha a senha!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/invalid-password':
            errorMessage.textContent = 'Senha inválida';
            errorMessage.style.display = 'block';
            break;
          default:
            errorMessage.textContent = 'Confira os dados inseridos. E-mail e senha incorretos ou em branco.';
            errorMessage.style.display = 'block';
        }
      });    
  };

  botaoCadastrar.addEventListener('click', registerUser);

    //evento para ouvir quando a mensagem estiver começando a ser digitada e limpar campo de erro
    emailEntrada.addEventListener('input', () => {
      errorMessage.textContent = '';
    });
    senhaEntrada.addEventListener('input', () => {
      errorMessage.textContent = '';
    });

  botaoVoltar.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#login';
  });

  return cadastroContainer;
};
