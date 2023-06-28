import { signUp } from '../../lib';
import { createUserData } from '../../lib/firestore';

export const cadastro = () => {
  const container = document.createElement('div');

  const templateCadastro = `
    
    <section class='registerpage-form'>
      <img src='./img/logo.png' class='logo-repet' alt='Logo da rede social re.Pet'>
  
      <form class='register-form'>
  
      <label for='nome'></label>
      <input type='text' class='form-inputs-register' id='nome-cadastro' required placeholder='Nome completo'>
      </input>
  
      <label for='email-cadastro'></label>
      <input type='email' class='form-inputs-register'  id='email-cadastro' required placeholder='Exemplo@email.com'>
      </input>
      
      <label for='senha-cadastro'></label>
      <input type='password' class='form-inputs-register' id='senha-cadastro' required placeholder='Senha'>
      </input>
  
      <label for='confirmar-senha'></label>
      <input type='password' class='form-inputs-register' id='confirmar-senha' required placeholder='Confirmar senha'>
      </input>

      <p id= 'mensagem-erro' ></p>

      <button type='submit' id='sign-up' >Cadastrar</button>
  
      </form>
       
    </div>

    </section>
  </section>
      <h3> Já possui cadastro? <a class='entrar' href='/#login'>Fazer login</a></h3>
      
      `;

  //  Registrar o usuario com nome,email,senha.
  container.innerHTML = templateCadastro;

  const register = container.querySelector('#sign-up');
  register.addEventListener('click', (event) => {
    event.preventDefault();
    const nome = container.querySelector('#nome-cadastro');
    const email = container.querySelector('#email-cadastro');
    const password = container.querySelector('#senha-cadastro');
    const confirmPassword = container.querySelector('#confirmar-senha');
    if (confirmPassword.value === password.value) {
      signUp(email.value, password.value)
        .then(async () => {
          createUserData(nome.value);
          container.querySelector('#mensagem-erro').innerHTML = 'Usuário cadastrado com sucesso!';
          setTimeout(() => {
            window.location.hash = '#login';
          }, 3000);
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;

          container.querySelector('#mensagem-erro').innerHTML = errorMessage;
          switch (errorMessage) {
            case 'Firebase: Error (auth/invalid-email).':
              container.querySelector('#mensagem-erro').innerHTML = 'E-mail inválido.';
              break;
            case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
              container.querySelector('#mensagem-erro').innerHTML = 'A senha deve conter pelo menos 6 caracteres.';
              break;
            case 'Firebase: Error (auth/email-already-in-use).':
              container.querySelector('#mensagem-erro').innerHTML = 'E-mail já cadastrado.';
              break;
            default:
              container.querySelector('#mensagem-erro').innerHTML = 'Erro ao cadastrar, tente novamente!';
              break;
          }
        });
    } else {
      container.querySelector('#mensagem-erro').innerHTML = 'As senhas devem ser as mesmas.';
    }
  });

  return container;
};
