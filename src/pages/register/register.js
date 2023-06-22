import { createUser } from '../../fireBase/firebaseAuth.js';
import { userData } from '../../fireBase/firebaseStore.js';
import customAlert from '../../components/customAlert.js'

export default () => {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('register-container');

  const content = `
    <section class="section-logo">
      <img src="../img/balão1.png" alt="balão"></img>
      <h2>TravellersBook</h2>
    </section>
    
    <form class='form-register'>
        <span class="text-title">CADASTRE-SE</span>
        <input class='inputsRegister' type='text' placeholder='nome' id='nameRegister'>
        <span class='text-error' id='text-name-error'></span>
        <input class='inputsRegister' type='text' placeholder='sobrenome' id='lastnameRegister'>
        <span class='text-error' id='text-last-name-error'></span>
        <input class='inputsRegister' type='text' placeholder='usuário' id='userRegister'>
        <span class='text-error' id='text-user-error'></span>
        <input class='inputsRegister' type='email' placeholder='e-mail' id='emailRegister'>
        <span class='text-error' id='text-email-error'></span>
        <input class='inputsRegister' type='password' placeholder='senha' id='passwordRegister'>
        <span class='text-error' id='text-password-error'></span>
        <section class="button-group">
          <button class='buttonRegister' id='firebaseRegister' type='submit' >Cadastrar</button>
          <button class="button-back" type='button'>&laquo; Voltar</button>
        </section>
        </form>
    `;
  registerContainer.innerHTML = content;

  const buttonBack = registerContainer.querySelector('.button-back')
  buttonBack.addEventListener('click', () => {
    window.location.hash = '#login'
  });

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
          customAlert('Cadastrado realizado com sucesso')
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
