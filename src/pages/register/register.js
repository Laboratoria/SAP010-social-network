import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';
import './register.css';

export default() => {
  // const body = document.getElementsByTagName('body')[0];
  // body.innerHTML = '';

  const registrationForm = document.createElement('div');
  registrationForm.classList.add('register-conteiner');
  const templateRegister = `
  <section class="form-register">
  <p class="title">Cadastrar-se</p>
  </section>
  <section class="register-box">
  <form class="register-form">
    <div class="inputs-div">
      <input type="text" class="inputs-register" id="name-user" placeholder="NOME">
      <input type="text" class="inputs-register" id="lastName-user" placeholder="SOBRENOME"><br>
      <input type="password" class="inputs-register" id="register-password" placeholder="CRIAR SENHA">
      </div>
    
      <div>
      <button type="button" class="register-btn" href="#timeline">CADASTRAR</button>
    </div> 
    </form>
</section>
`;

registrationForm.innerHTML = templateRegister;
return registrationForm
// body.appendChild(registrationFormView);


}
