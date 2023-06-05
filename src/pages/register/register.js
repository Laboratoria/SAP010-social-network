import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';
// import './register.css';

export default () => {
  const registrationForm = document.createElement('div');
  registrationForm.classList.add('register-container');

  const templateRegister = /*html*/` 

    <section class="form-register">
      <p class="title">Cadastrar-se</p>
    <!-- </section> -->
    <!-- <section class="register-box"> -->
      <form class="register-form">
        <div>
          <input type="text" class="inputs-register" id="name-user" placeholder="NOME">
          <input type="text" class="inputs-register" id="lastName-user" placeholder="SOBRENOME">
          <input type="text" class="inputs-register" id="email-user" placeholder="EMAIL">
          <input type="password" class="inputs-register" id="register-password" placeholder="CRIAR SENHA">
        </div>
    
        <div>
          <button type="button" class="register-btn">CADASTRAR</button>
        </div> 
        <nav>
          <button type="button" class="back-btn"><a class="btn-back" href="#login">VOLTAR</a></button>
        </nav> 
        <p id="error-message" class="error-message"></p>

    </form>
  </section>
`;


  registrationForm.innerHTML = templateRegister;

  const registerButton = registrationForm.querySelector('.register-btn');
  registerButton.addEventListener('click', registerUser);

  async function registerUser() {
    const name = document.getElementById('name-user').value;
    const lastName = document.getElementById('lastName-user').value;
    const email = document.getElementById('email-user').value;
    const password = document.getElementById('register-password').value;

    const validationErrors = validateRegister(name, lastName, email, password);
    if (validationErrors.length > 0) {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = validationErrors.join(', ');
      return;
    }

    try {
      await createUserWithEmail(name, email, password);
      window.location.hash = '#timeline';
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      console.error(errorsFirebase[error.code]);

      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = errorsFirebase[error.code] || 'Erro ao registrar o usuário.';
    }
  }

  return registrationForm;
};
