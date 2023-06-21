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
        <input type="text" id="nameRegister" placeholder="Digite seu Nome"/>
        <span id="nome-obrigatorio" class="error">
        Nome é obrigatório.
      </span>
        <label for="email">E-Mail*</label>
        <input type="email" id="emailRegister" placeholder="Digite seu melhor e-mail"/>
        <span id="email-obrigatorio" class="error">
        E-mail é obrigatório.
      </span>
      <span id="email-invalido" class="error">
        E-mail não é válido.
      </span>
        <label for="senha">Crie sua Senha*</label>
        <input type="password" id="senhaUsuario" placeholder="Digite sua senha" required/>
        <span id="senha-obrigatorio" class="error">
        Senha é obrigatória.
      </span>
        <p>Selecione a sua área de atuação*</p>
      <select class="areaDeAtuacao" id="atuaçao" required>
        <option value="produtor">Produtor de café</option>
        <option value="empresario">Empresário do ramo de café</option>
        <option value="comprador">Comprador ou negociante de café</option>
        <option value="outros">Outros</option>
      </select>
      <span id="atuacao-obrigatoria" class="error">
        Área de atuação é obrigatória.
      </span>
      </div>
      <div class="botoes">
      <button type="button" id="btn-register" disabled="true">Registrar</button>
      <button type="button" id="btn-home">Voltar</button>
      </div>
      <div id="errorMessage" class="error">
      </div>
    </fieldset>
  `;

  container.innerHTML = templateRegister;

  const nameInput = container.querySelector('#nameRegister');
  const emailInput = container.querySelector('#emailRegister');
  const senhaInput = container.querySelector('#senhaUsuario');
  const registerButton = container.querySelector('#btn-register');
  const homeButton = container.querySelector('#btn-home');

  const form = {
    emailValidacao: () => container.querySelector('#emailRegister'),
    emailObrigatorio: () => container.querySelector('#email-obrigatorio'),
    emailInvalido: () => container.querySelector('#email-invalido'),
  };

  emailInput.addEventListener('onchange', () => {
    const email1 = form.emailValidacao().value;
    form.emailObrigatorio().style.display = email1 ? 'none' : 'block';

    form.emailInvalido().style.display = validateEmail() ? 'none' : 'block';
  });

  const registerUser = () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const areaAtuacao = container.querySelector('#atuaçao').value;

    createUserWithEmail(name, email, senha, areaAtuacao)
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            emailElement.classList.add('input-error');
            textEmailError.innerHTML = 'Este e-mail já está cadastrado';
            break;

          case 'auth/missing-email':
            emailElement.classList.add('input-error');
            textEmailError.innerHTML = 'Preencha esse campo';
            break;

          case 'auth/invalid-email':
            emailElement.classList.add('input-error');
            textEmailError.innerHTML = 'E-mail inválido';
            break;

          case 'auth/missing-password':
            passwordElement.classList.add('input-error');
            textPasswordError.innerHTML = 'Preencha esse campo';
            break;

          case 'auth/weak-password':
            passwordElement.classList.add('input-error');
            textPasswordError.innerHTML = 'A senha deve conter no mín. 6 dígitos';
            break;

          default:
            textPasswordError.innerHTML = "Erro ao cadastrar: " + error.code;
        }

      });
  };

  registerButton.addEventListener('click', registerUser);

  homeButton.addEventListener('click', () => {
    window.location.hash = '';
  });

  return container;
};
