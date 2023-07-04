import { signIn, signInGoogle } from '../../lib/index.js';
import logo from '../../img/logo.png';

export const login = () => {
  const container = document.createElement('div');

  const templateLogin = `
    
    <section class='loginpage-form'>
    <img src='${logo}' class='logo-repet' alt='Logo da rede social re.Pet'>
    <form class='login-input-container'>
    <label for='email-login'></label>
    <input class='form-inputs' type='email' id='email-login' required placeholder='Email'>
    </input>
    
    <label for='senha-login'></label>
    <input type='password' class='form-inputs' id='senha-login' required placeholder='Senha'>
    </input>
    <p id= 'mensagem-erro' ></p>
    <button type='submit' class='loginpage-button' id='login-button'>Entrar</button>
    
    </form>
    <div class='google-login'>
      <div class='google-icon-wrapper'>
        <img class='google-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'/>
      </div> 
      <a id='botao-google'>  Entrar com o Google </a> 
    </div>

    </section>


       
    <h3> Não possui cadastro? <a class='criar-conta' href='/#cadastro'>Criar conta</a></h3>
    
  
    `;

  container.innerHTML = templateLogin;

  container
    .querySelector('#login-button')
    .addEventListener('click', (event) => {
      event.preventDefault();

      const email = container.querySelector('#email-login');
      const password = container.querySelector('#senha-login');

      signIn(email.value, password.value)
        .then(() => {
          window.location.hash = '#feed';
          // const user = userCredential.user;
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          container.querySelector('#mensagem-erro').innerHTML = errorMessage;
          switch (errorMessage) {
            case 'Firebase: Error (auth/user-not-found).':
              container.querySelector('#mensagem-erro').innerHTML = 'Usuário não encontrado.';
              break;
            case 'Firebase: Error (auth/wrong-password).':
              container.querySelector('#mensagem-erro').innerHTML = 'Senha incorreta.';
              break;
            default:
              container.querySelector('#mensagem-erro').innerHTML = 'Erro ao fazer o login, tente novamente!';
              break;
          }
        });
    });

  container.querySelector('#botao-google').addEventListener('click', () => {
    signInGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        container.querySelector('#mensagem-erro').innerHTML = 'Erro, tente novamente!';
      });
  });
  return container;
};
