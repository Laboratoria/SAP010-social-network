import './register.css'
import registerImageMobile from '../../images/register-mobile.gif'
import registerImageDesktop from '../../images/register-desktop.gif'
import googleImg from '../../images/google.svg'
import githubImg from '../../images/github-mobile.svg'
import { registerUserWithAnotherProvider, registerUser, signInWithGoogle, signInWithGitHub, auth } from '../../firebase/firebase.js';

export default () => {
  //const register = () => {
    const userRegister = document.createElement('div');
    userRegister.classList.add("container-register");
    const template = `
      <section class="register-top">
      <img class="register-image-mobile" src=${registerImageMobile} alt="register-animation">
      <img class="register-image-desktop" src=${registerImageDesktop} alt="register-animation">
        <h1>CADASTRO</h1>
      </section>
      <section class="register-box">
        <h1>CADASTRO</h1>
        <form class="register-form">
          <input type="text" id="name" required placeholder="Nome e Sobrenome">
          <input type="text" id="username" required placeholder="Username">
          <input type="email" id="email" required placeholder="E-mail">
          <input type="password" id="password" required placeholder="Senha">
          <input type="password" id="confirm-password" required placeholder="Confirmar senha">
          <button type="submit" class="btn-register" disabled>Inscreva-se</button>
          <h2>ou continue com</h2>
          <picture class="register-icons">
          <img class="btn-google" src=${googleImg} alt="google icon">
          <img class="btn-github" src=${githubImg} alt="github icon">
          </picture>
        </form>
      </section>
    `;
    userRegister.innerHTML = template;
    const appContainer = document.querySelector('#main');
    appContainer.appendChild(userRegister);

    const form = document.querySelector('.register-form');
    const inputs = form.querySelectorAll('input');
    const btnRegister = form.querySelector('.btn-register');
    const verifyForm = () => {
      const allInputs = Array.from(inputs).every((input) => input.value !== '');
      btnRegister.disabled = !allInputs;
    };
    inputs.forEach((input) => {
      input.addEventListener('input', verifyForm);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        alert('As senhas informadas são diferentes');
        return;
      }
      try {
        await registerUser(name, username, email, password);
        alert('Usuário registrado com sucesso');
      } catch (error) {
        alert(`Erro ao registrar usuário: ${error.message}`);
      }
    });

    const signInWithGoogleButton = form.querySelector('.btn-google');
    const signInWithGitHubButton = form.querySelector('.btn-github');

    signInWithGoogleButton.addEventListener('click', async () => {
      await signInWithGoogle();
      console.log(auth);
      registerUserWithAnotherProvider(auth.currentUser.uid, auth.currentUser.displayName, auth.currentUser.displayName, auth.currentUser.email);
    });
    signInWithGitHubButton.addEventListener('click', async () => {
      await signInWithGitHub();
      console.log(auth);
      registerUserWithAnotherProvider(auth.currentUser.uid, auth.currentUser.displayName, auth.currentUser.displayName, auth.currentUser.email);
    });

    return userRegister;
  };

  //register();
  
//};
