import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';

export default () => {
  function getInputValues() {
    const name = document.getElementById('name-user').value;
    const lastName = document.getElementById('lastName-user').value;
    const email = document.getElementById('email-user').value;
    const password = document.getElementById('register-password').value;

    return {
      name,
      lastName,
      email,
      password,
    };
  }

  function printErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
  }

  async function registerUser() {
    const { name, lastName, email, password } = getInputValues();
    const validationErrors = validateRegister(name, lastName, email, password);

    if (validationErrors.length > 0) {
      printErrorMessage(validationErrors);
      return;
    }

    try {
      await createUserWithEmail(name, email, password, lastName);
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
      <p class='title'>Cadastrar-se</p>
      <form class='register-form'>
        <div>
          <input type='text' class='inputs-register' id='name-user' placeholder='NOME'>
          <input type='text' class='inputs-register' id='lastName-user' placeholder='SOBRENOME'>
          <input type='text' class='inputs-register' id='email-user' placeholder='EMAIL'>
          <input type='password' class='inputs-register' id='register-password' placeholder='CRIAR SENHA'>
        </div>
        <div>
          <button type='button' class='register-btn'>CADASTRAR</button>
        </div> 
        <p id='error-message' class='error-message'></p>
      </form>
    <nav>
      <a class='btn-back' href='#login'><img src='img/assets/arrow.png' id='arrow-img' alt='imagem de seta' width='50px'></a>
    </nav> 
    </section>
    <figure class='Image-register'>
    <img src='img/assets/imageregister.png' id='img-register' alt='registerImage'>
    </figure>
  `;

  registrationForm.innerHTML = templateRegister;

  registrationForm
    .querySelector('.register-btn')
    .addEventListener('click', registerUser);

  return registrationForm;
};
