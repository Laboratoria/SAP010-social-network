import './register.css';
import registerImage from '../../images/register.svg';
import { registerUser, auth } from '../../firebase/firebase.js';

export default () => {
  // Definindo o HTML do formulário de cadastro
  const userRegister = document.createElement('div');
  userRegister.classList.add('container-register');
  const template = `
      <section class="register-top">
      <img class="register-image" src=${registerImage} alt="register-animation">
        <h1>CADASTRO</h1>
      </section>
      <section class="register-box">
        <h1>CADASTRO</h1>
        <form class="register-form">
          <input type="text" id="name" required placeholder="Nome e Sobrenome">
          <input type="text" id="username" required placeholder="Username">
          <input type="email" id="email" required placeholder="E-mail">
           <div class="password-container">
             <input type="password" id="password" required placeholder="Ex: Senha@1">
             <input type="checkbox" id="password-checkbox">
             <label for="password-checkbox" class="btn-checkbox"></label>
           </div>
          <span id='password-alert' class='alert'></span>
          <div class="password-container">
            <input type="password" id="confirm-password" required placeholder="Confirmar senha">
            <input type="checkbox" id="confirm-password-checkbox">
            <label for="confirm-password-checkbox" class="btn-checkbox"></label>
          </div>
          <span id='password-different' class='alert'></span>
          <button type="submit" class="btn-register" disabled>Inscreva-se</button>
          <p class="have-an-account">Já possui uma conta?<a class="login-account" href="/#login">Acesse sua conta agora</a></p>
        </form>
      </section>
    `;
  userRegister.innerHTML = template;
  const appContainer = document.querySelector('#main');
  appContainer.appendChild(userRegister);
  // Selecionando elementos do formulário
  const form = document.querySelector('.register-form');
  const inputs = form.querySelectorAll('input');
  const btnRegister = form.querySelector('.btn-register');
  // Selecionando elementos de alerta de senha
  const passwordAlert = document.getElementById('password-alert');
  const passwordDifferent = document.getElementById('password-different');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/~]).{6,}$/;
  // Função para verificar se todos os campos do formulário estão preenchidos
  const verifyForm = () => {
    const allInputs = Array.from(inputs).every((input) => input.value !== '');
    btnRegister.disabled = !allInputs;
  };
  inputs.forEach((input) => {
    input.addEventListener('input', verifyForm);
  });
  // Função para validar a senha
  const validatePassword = () => {
    const password = passwordInput.value; // Obter o valor do campo de senha
    return strongPassword.test(password);
  };
  // Escutando o submit para enviar o formulário
  form.addEventListener('submit', async (e) => {
    e.preventDefault();// Evitar envio do formulário por padrão
    // Obter os valores dos campos de entrada
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    // Verificar se a senha atende aos requisitos mínimos
    if (!validatePassword()) {
      passwordAlert.textContent = '1 letra maíuscula e minuscula, 1 caracter especial e 1 número';
    }
    // Limpar os alertas de senha quando o campo é modificado
    passwordInput.addEventListener('input', () => {
      passwordAlert.textContent = '';
    });
    confirmPasswordInput.addEventListener('input', () => {
      passwordDifferent.textContent = '';
    });
    // Verificando se as senhas são iguais
    let officialPassword;
    if (password !== confirmPassword) {
      passwordDifferent.textContent = 'As senhas informadas são diferentes';
    } else if (strongPassword.test(password)) {
      officialPassword = password;
    } else {
      passwordAlert.textContent = '1 letra maíuscula e minuscula, 1 caracter especial e 1 número';
    }
    // Registrar o usuário usando as informações fornecidas
    await registerUser(name, username, email, officialPassword);

    if (auth.currentUser) {
      window.location.href = '#feed';
    }
  });

  // Adicionar evento de clique no checkbox para mostrar/esconder a senha
  const passwordCheckbox = document.getElementById('password-checkbox');
  passwordCheckbox.addEventListener('change', () => {
    if (passwordCheckbox.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  const confirmPasswordCheckbox = document.getElementById('confirm-password-checkbox');
  confirmPasswordCheckbox.addEventListener('change', () => {
    if (confirmPasswordCheckbox.checked) {
      confirmPasswordInput.type = 'text';
    } else {
      confirmPasswordInput.type = 'password';
    }
  });

  return userRegister;
};
