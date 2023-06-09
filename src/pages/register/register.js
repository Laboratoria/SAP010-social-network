import { errorsFirebase, validateRegister } from "../../validations.js";
import { createUserWithEmail } from "../../firebase/auth.js";
// import './register.css';

export default () => {
  // Cria um elemento div para o formulário de registro
  const registrationForm = document.createElement("div");
  registrationForm.classList.add("register-container");

  const templateRegister = /html/ ` 

    <section class="form-register">
      <p class="title">Cadastrar-se</p>
   
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
        
        <p id="error-message" class="error-message"></p>

    </form>
  </section>
      <br>
        <nav>
        <a class="btn-back" href="#login"><img src="img/assets/arrow.png" id="arrow-img" alt="imagem de seta" width = 50px></a>
        </nav> 
  
`;

  // Define o HTML do formulário de registro
  registrationForm.innerHTML = templateRegister;

  // Obtém o botão de registro
  const registerButton = registrationForm.querySelector(".register-btn");

  // Adiciona um ouvinte de evento para o clique no botão de registro
  registerButton.addEventListener("click", registerUser);

  // Função assíncrona para registrar o usuário
  async function registerUser() {
    const name = document.getElementById("name-user").value;
    const lastName = document.getElementById("lastName-user").value;
    const email = document.getElementById("email-user").value;
    const password = document.getElementById("register-password").value;

    // Valida os dados do formulário de registro
    const validationErrors = validateRegister(name, lastName, email, password);
    if (validationErrors.length > 0) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = validationErrors;
      return;
    }
    try {
      // Cria um novo usuário com email e senha
      await createUserWithEmail(name, email, password);
      window.location.hash = "#timeline";
    } 
    catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      const printError = errorsFirebase(error.code);

      // Exibe uma mensagem de erro caso ocorra um erro durante o registro
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = printError || "Erro ao registrar o usuário";
    }
  }
  // Retorna o elemento div do formulário de registro
  return registrationForm;
};