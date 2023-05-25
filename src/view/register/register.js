import { registerUser } from '../../firebase/firebase.js';

const register = () => {
  const userRegister = document.createElement('div');
  userRegister.classList.add('container-register');
  const template = `
    <section class="register-top">
        <img>
        <h1>CADASTRO</h1>
        </section>
    <section class="register-box">
    <form class="register-form">
        <input type="text" id="name" required placeholder="Nome e Sobrenome">
        <input type="text" id="username" required placeholder="Username">
        <input type="email" id="email" required placeholder="E-mail">
        <input type="password" id="password" required placeholder="Senha">
        <input type="password" id="confirm-password" required placeholder="Confirmar senha">
        <button type="submit" class="btn-register" disabled> Inscreva-se</Inscreva-se></button>
        <h2>ou continue com</h2>
        <img>
    </form>
    </section>
  `;
  userRegister.innerHTML = template;
  const appContainer = document.querySelector('#app');
  appContainer.appendChild(userRegister);
};

register();

const form = document.querySelector('.register.form');
const inputs = form.querySelectorAll('input');
const btnRegister = form.querySelector('.btn-register');
const verifyForm = () => {
  const allInputs = Array.from(inputs).every((input) => input.value !== '');
  btnRegister.disabled = !allInputs;
};
inputs.forEach((input) => {
  input.addEventListener('input', verifyForm);
});

form.addEventListener('sumit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    // eslint-disable-next-line no-alert
    alert('As senhas informadas são diferentes');
    return;
  }
  try {
    await registerUser(name, username, email, password);
    // eslint-disable-next-line no-alert
    alert('Usuário registrado com sucesso');
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(`Erro ao registrar usuário: ${error.message}`);
  }
});
