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
      <button type="button" class="register-btn"><a class= "btn-register" href="#timeline">CADASTRAR</a></button>
    </div> 
    <nav>
   <button type="button" class="back-btn"><a class= "btn-back" href="#Login">VOLTAR</a></button>
    </nav> 
    </form>
  </section>
`;


  registrationForm.innerHTML = templateRegister;

  // Adicione o evento de clique programaticamente
  const registerButton = registrationForm.querySelector('.register-btn');
  registerButton.addEventListener('click', registerUser);

  // Defina a função registerUser
  async function registerUser() {
    const name = document.getElementById('name-user').value;
    const lastName = document.getElementById('lastName-user').value;
    const email = document.getElementById('email-user').value;
    const password = document.getElementById('register-password').value;

    // Realize as validações necessárias usando a função validateRegister
    const validationErrors = validateRegister(name, lastName, email, password);
    if (validationErrors.length > 0) {
      const errorElement = document.createElement('p');
      errorElement.textContent = validationErrors.join(', ');
      registrationForm.appendChild(errorElement);
      return;
    }


    try {
      await createUserWithEmail(name, email, password);

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
    }
  }

  return registrationForm;
};
