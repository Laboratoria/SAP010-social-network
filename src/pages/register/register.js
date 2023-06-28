import './register.css';
import { createUserWithEmail } from '../../configFirebase/auth';

export default () => {
  const container = document.createElement('div');

  const templateRegister = `

  <div class="imagens">
  <img class="logo-cs" src="./images/logo1.png">
  <img class="imagem-fundo" src="./images/background-desktop.png">
  </div>
    <fieldset>
      <h2> *CAMPOS OBRIGATÓRIOS  </h2>
      <div class="cadastro">
        <label for="name">Nome Completo*</label>
        <input type="text" id="nameRegister" placeholder="Ex.: Maria da Silva" required/>
        <label for="email">E-Mail*</label>
        <input type="email" id="emailRegister" placeholder="Ex.: email@email.com" required/>
        <div id="errorEmail" class="error">
      </div>
        <label for="senha">Crie sua Senha*</label>
        <input type="password" id="senhaUsuario" placeholder="Ex.: 123456" required required/>
        <p>Selecione a sua área de atuação*</p>
      <select class="areaDeAtuacao" id="atuaçao" required>
        <option value="produtor">Produtor de café</option>
        <option value="empresario">Empresário do ramo de café</option>
        <option value="comprador">Comprador ou negociante de café</option>
        <option value="outros">Outros</option>
      </select>
      </div>
      <div class="botoes">
      <button type="button" id="btn-register">Registrar</button>
      <button type="button" id="btn-home">Voltar</button>
      </div>
      <div id="errorMessage" class="error">
      </div>
      <footer> Desenvolvedoras: Aline Ferreira, Josi Corrêa e Nara Monteiro </footer>
    </fieldset>
  `;

  container.innerHTML = templateRegister;

  const nameInput = container.querySelector('#nameRegister');
  const emailInput = container.querySelector('#emailRegister');
  const senhaInput = container.querySelector('#senhaUsuario');
  const registerButton = container.querySelector('#btn-register');
  const homeButton = container.querySelector('#btn-home');
  const registerUser = () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const areaAtuacao = container.querySelector('#atuaçao').value;

    createUserWithEmail(name, email, senha, areaAtuacao)
      .then(() => {
      }).catch((error) => {
        const errorMessage = container.querySelector('#errorMessage');
        errorMessage.style.display = 'block';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage.textContent = 'E-mail já está em uso!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/missing-email':
            errorMessage.textContent = 'Preencha o campo de e-mail!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/invalid-email':
            errorMessage.textContent = 'E-mail inválido!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/missing-password':
            errorMessage.textContent = 'Preencha o campo de senha!';
            errorMessage.style.display = 'block';
            break;

          case 'auth/weak-password':
            errorMessage.textContent = 'A senha deve conter, no min. 6 dígitos!';
            errorMessage.style.display = 'block';
            break;

          default:
            errorMessage.textContent = 'Confira os dados digitados';
            errorMessage.style.display = 'block';
        }
      });
  };

  registerButton.addEventListener('click', registerUser);

  homeButton.addEventListener('click', () => {
    window.location.hash = '';
  });

  return container;
};
