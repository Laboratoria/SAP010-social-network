import { loginCreate } from '../lib/index.js';

export const register = () => {
    const root = document.getElementById('root');
    const registerHTML = `
    <div class="register-elements">
        <form id="formulario-cadastro">
            <h1 class="register-h1"> Cadastro de usuário </h1>
                <div>
                    <label class="dados" for="nome">Nome:</label>
                    <input class="nome" type="text" id="nome" placeholder="Nome" required>
                </div>
   
                <div>
                    <label class="dados" for="email">E-mail:</label>
                    <input class="email" type="email" id="email" placeholder="contato@gmail.com" required>
                </div>
   
                <div>
                    <label class="dados" for="senha">Senha:</label>
                    <input class="senha" type="password" id="senha" placeholder="********" required>
                </div>
   
                <div>
                    <label class="dados" for="confirma-senha">Confirmar senha:</label>
                    <input class="confirmar-senha" type="password" id="confirma-senha" placeholder="********" required>
                </div>
   
                <button class="btn-register" type="submit">Cadastrar</button>
        </form>
    </div> `;
  root.innerHTML = registerHTML;

  const inputNome = root.querySelector('.nome');
  const inputEmail = root.querySelector('.email[type="email"]');
  const inputSenha = root.querySelector('.senha[type="password"]');
  const confirmarSenha = root.querySelector('.confirmar-senha');
  const btnRegister = root.querySelector('.btn-register');

  btnRegister.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputSenha.value;


    if (validateEmail, email)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Cadastro efetuado com sucesso!! Você sera direcionado a página inicial para efetuar o login.')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  });
  function validateEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }
  function validatePassword(password) {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regexPassword.test(password);
  }
};
