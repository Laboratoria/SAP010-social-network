import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';
import arrow from '../../assets/arrow.png';
import imageregister from '../../assets/imageregister.png';

export default () => {
  function getInputValues() {
    const name = document.getElementById('name-user').value;
    const lastName = document.getElementById('lastName-user').value;
    const email = document.getElementById('email-user').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    return {
      name,
      lastName,
      email,
      password,
      confirmPassword,
    };
  }

  function printErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
  }

  async function registerUser() {
    const {
      name, lastName, email, password, confirmPassword,
    } = getInputValues();
    const validationErrors = validateRegister(name, lastName, email, password);

    if (validationErrors.length > 0) {
      printErrorMessage(validationErrors);
      return;
    }

    if (password !== confirmPassword) {
      printErrorMessage('Senhas não correspondem');
      return;
    }

    try {
      await createUserWithEmail(name, lastName, email, password);
      window.location.hash = '#timeline';
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      const printError = errorsFirebase(error.code);
      printErrorMessage(printError || 'Erro ao registrar o usuário');
    }
  }

  const registrationForm = document.createElement('div');

  const templateRegister = ` 
  <a class='btn-back' href='#login'><img src='${arrow}' class='btn-back' alt='imagem de seta'></a>

    <div class='bloco'>
      <section class='form-register'>
        <h2 class='subtitle'>Cadastrar-se</h2>
        <form class='register-form'>
          <input type='text' class='inputs-register' id='name-user' placeholder='NOME'>
          <input type='text' class='inputs-register' id='lastName-user' placeholder='SOBRENOME'>
          <input type='text' class='inputs-register' id='email-user' placeholder='EMAIL'>
          <input type='password' class='inputs-register' id='register-password' placeholder='CRIAR SENHA'>
          <button type='button' id='show-eye1' class='icon-eye1'>
          <span class='icons-eye1'>
            <span class='icon-container'><i class='fas fa-eye-slash'></i></span>
          </span> 
        </button>
          <input type='password' class='inputs-register' id='confirm-password' placeholder='CONFIRME SENHA'>
          <button type='button' id='show-eye2' class='icon-eye2'>
          <span class='icons-eye2'>
            <span class='icon-container'><i class='fas fa-eye-slash'></i></span>
          </span> 
        </button>
          <button type='button' id='register-button' class='submit'>CADASTRAR</button>
          <p id='error-message' class='error-message'></p>
        </form>
      </section>
    </div>
    <figure class='image-register'>
      <img src='${imageregister}' class='img-register' alt='registerImage'>
    </figure>
  `;

  registrationForm.innerHTML = templateRegister;

  registrationForm
    .querySelector('#register-button')
    .addEventListener('click', registerUser);

  const button = registrationForm.querySelector('.icon-eye1');
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const changeEye = button.querySelector('i');
    const input = registrationForm.querySelector('#register-password');
    if (input.getAttribute('type') === 'text') {
      input.setAttribute('type', 'password');
      changeEye.classList.remove('fa-eye');
      changeEye.classList.add('fa-eye-slash');
    } else {
      input.setAttribute('type', 'text');
      changeEye.classList.remove('fa-eye-slash');
      changeEye.classList.add('fa-eye');
    }
  });

  const btnEye = registrationForm.querySelector('#show-eye2');
  btnEye.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const changeEye = btnEye.querySelector('i');
    const input = registrationForm.querySelector('#confirm-password');
    if (input.getAttribute('type') === 'text') {
      input.setAttribute('type', 'password');
      changeEye.classList.remove('fa-eye');
      changeEye.classList.add('fa-eye-slash');
    } else {
      input.setAttribute('type', 'text');
      changeEye.classList.remove('fa-eye-slash');
      changeEye.classList.add('fa-eye');
    }
  });

  return registrationForm;
};
