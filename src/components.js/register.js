import { loginCreate } from '../lib/index.js';

export const register = () => {
  const container = document.createElement('div');
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
  container.innerHTML = registerHTML;

  const inputEmail = container.querySelector('.email');
  const inputPassword = container.querySelector('.senha');
  const form = container.querySelector('#formulario-cadastro');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;

    function validateEmail(validEmail) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regexEmail.test(validEmail);
    }
    function validatePassword(validPassword) {
      const regexPassword = /^.{6,}$/;
      return regexPassword.test(validPassword);
    }

    if (validateEmail(email) && validatePassword(password)) {
      try {
        loginCreate(email, password);
        alert('Cadastro efetuado com sucesso!! Você será direcionado à página inicial para efetuar o login.');
        window.location.hash = 'welcome';
      } catch (error) {
        alert('Ocorreu um erro ao criar o seu cadastro, por favor tente novamente.');
      }
    } else {
      alert('Por favor, insira um e-mail válido e uma senha com no mínimo 6 caracteres.');
    }
  });

  return container;
};
