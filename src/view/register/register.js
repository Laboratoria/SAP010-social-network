import './register.css'
import registerImage from '../../images/register.svg'
import googleImg from '../../images/google.svg'
import githubImg from '../../images/github-mobile.svg'
import { registerUserWithAnotherProvider, registerUser, signInWithGoogle, signInWithGitHub, auth } from '../../firebase/firebase.js';

export default () => {
  // Definindo o HTML do formulário de cadastro
    const userRegister = document.createElement('div');
    userRegister.classList.add("container-register");
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
             <input type="password" id="password" required placeholder="Senha">
             <input type="checkbox" id="password-checkbox">
             <label for="password-checkbox" class="btn-checkbox"></label>
           </div>
          <span id='password-alert' class='alert'></span>
          <input type="password" id="confirm-password" required placeholder="Confirmar senha">
          <span id='password-different' class='alert'></span>
          <button type="submit" class="btn-register" disabled>Inscreva-se</button>
          <p>ou continue com</p>
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
    // Selecionando elementos do formulário
    const form = document.querySelector('.register-form');
    const inputs = form.querySelectorAll('input');
    const btnRegister = form.querySelector('.btn-register');
    // Selecionando elementos de alerta de senha
    const passwordAlert = document.getElementById('password-alert');
    const passwordDifferent = document.getElementById('password-different');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
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
      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/~]).{6,}$/;
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

      passwordAlert.textContent = 'A senha não atende aos requisitos mínimos';
    }
    // Limpar os alertas de senha quando o campo é modificado
    passwordInput.addEventListener('input', () => {
      passwordAlert.textContent = '';
    });
    confirmPasswordInput.addEventListener('input', () => {
      passwordDifferent.textContent = '';
    });  
    // Verificando se as senhas são iguais
      if (password !== confirmPassword) { 
      passwordDifferent.textContent = 'As senhas informadas são diferentes';
    } 
       // Registrar o usuário usando as informações fornecidas
        await registerUser(name, username, email, password);
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

    // Selecionando os botões de login com o Google e GitHub
    const signInWithGoogleButton = form.querySelector('.btn-google');
    const signInWithGitHubButton = form.querySelector('.btn-github');
    // Adicionando eventos de click aos botões de login com o Google e GitHub
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
