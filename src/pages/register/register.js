import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';

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
  // registrationForm.classList.add('register-container'); // verificar

  const templateRegister = ` 
    <section class='form-register'>
      <h2 class='subtitle'>Cadastrar-se</h2>
      <form class='register-form'>
        <div>
          <input type='text' class='inputs-register' id='name-user' placeholder='NOME'>
          <input type='text' class='inputs-register' id='lastName-user' placeholder='SOBRENOME'>
          <input type='text' class='inputs-register' id='email-user' placeholder='EMAIL'>
          <input type='password' class='inputs-register' id='register-password' placeholder='CRIAR SENHA'>
          <input type='password' class='inputs-register' id='confirm-password' placeholder='CONFIRME SUA SENHA'>

        </div>
        <div>
          <button type='button' id='register-button' class='submit'>CADASTRAR</button>
        </div> 
        <p id='error-message' class='error-message'></p>
      </form>
    <nav>
      <a class='btn-back' href='#login'><img src='img/assets/arrow.png' alt='imagem de seta' width='50px'></a>
    </nav> 
    </section>
    <figure class='image-register'>
    <img src='img/assets/imageregister.png' class='img-register' alt='registerImage'>
    </figure>
  `;

  registrationForm.innerHTML = templateRegister;

  registrationForm
    .querySelector('#register-button')
    .addEventListener('click', registerUser);

  return registrationForm;
};
