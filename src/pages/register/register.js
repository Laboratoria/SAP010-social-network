import { createUser } from '../../fireBase/firebaseAuth.js';
import { userData } from '../../fireBase/firebaseStore.js';

export default () => {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('register-container');

  const content = `
    <header nav class="nav-header">
      <a href="index.html">
        <button class="btn-header">&laquo; Voltar</button>
      </a>
    </nav>
    </header>

    <section class="register-logo">
      <img src="../img/balão1.png" alt="balão"></img>
      <h1>TravellersBook</h1>
    </section>
    
    <form class='form-register'>
        <span class="text-title">CADASTRE-SE</span>
        <input class='inputsRegister' type='text' placeholder='Nome' id='nameRegister'>
        <span class='text-error' id='text-name-error'></span>
        <input class='inputsRegister' type='text' placeholder='Sobrenome' id='lastnameRegister'>
        <span class='text-error' id='text-last-name-error'></span>
        <input class='inputsRegister' type='text' placeholder='Usuário' id='userRegister'>
        <span class='text-error' id='text-user-error'></span>
        <input class='inputsRegister' type='email' placeholder='Email' id='emailRegister'>
        <span class='text-error' id='text-email-error'></span>
        <input class='inputsRegister' type='password' placeholder='Senha' id='passwordRegister'>           
        <span class='text-error' id='text-password-error'></span>
        <button class='buttonRegister' id='firebaseRegister' type='submit' >Cadastrar</button>
        </form>
    `;
    registerContainer.innerHTML = content;

  const register = registerContainer.querySelector('.form-register');
  register.addEventListener('submit', event => {
    event.preventDefault();

    const nameElement = registerContainer.querySelector('#nameRegister');
    const textNameError = registerContainer.querySelector ('#text-name-error');
    const lastNameElement = registerContainer.querySelector('#lastnameRegister');
    const textLastNameError = registerContainer.querySelector('#text-last-name-error')
    const userElement = registerContainer.querySelector('#userRegister');
    const textUserError =registerContainer.querySelector('#text-user-error');
    const emailElement = registerContainer.querySelector('#emailRegister');
    const textEmailError = registerContainer.querySelector('#text-email-error');
    const passwordElement = registerContainer.querySelector('#passwordRegister');
    const textPasswordError = registerContainer.querySelector('#text-password-error');

    nameElement.classList.remove('input-error')
    textNameError.innerHTML = '';

    lastNameElement.classList.remove('input-error')
    textLastNameError.innerHTML = '';

    userElement.classList.remove('input-error')
    textUserError.innerHTML = '';

    emailElement.classList.remove('input-error')
    textEmailError.innerHTML = '';

    passwordElement.classList.remove('input-error')
    textPasswordError.innerHTML = '';

    if (
      nameElement.value === '' ||
      lastNameElement.value === '' ||
      userElement.value === ''
    ) {
      if (userElement.value === ''){
        userElement.classList.add('input-error')
        textUserError.innerHTML = 'Preencha esse campo';
      }
      if (nameElement.value === '') {
        nameElement.classList.add('input-error')
        textNameError.innerHTML = 'Preencha esse campo';
      }
      if (lastNameElement.value === ''){
        lastNameElement.classList.add('input-error')
        textLastNameError.innerHTML = 'Preencha esse campo';
      }

    } else {
      createUser(
        emailElement.value,
        passwordElement.value,
        nameElement.value,
        lastNameElement.value,
        userElement.value
      )
        .then(() =>
          userData(
            nameElement.value,
            lastNameElement.value,
            emailElement.value,
            userElement.value
          )
        )
        .then(() => {
          window.location.hash = '#login';
        })
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
    }
  });

  return registerContainer;
};
