import { createUser } from '../../fireBase/firebaseAuth.js';
import { userData } from '../../fireBase/firebaseStore.js';

export default () => {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('register-container');

  const content = `
    
    <header nav class="nav-header">
    <a href="index.html"
      ><button class="btn-header">&laquo; Voltar</button></a
    >
  </nav>
    </header>

    <section class="register-logo">
      <img src="../img/balão1.png" alt="balão"></img>
      <h1>TravellersBook</h1>
    </section>
    
    <form class='form-register'>
        <h3> CADASTRE-SE </h3>
        <input class='inputsRegister' type='text' placeholder='Nome' id='nameRegister'>
        <input class='inputsRegister' type='text' placeholder='Sobrenome' id='lastnameRegister'>
        <input class='inputsRegister' type='text' placeholder='Usuário' id='userRegister'>
        <input class='inputsRegister' type='email' placeholder='Email' id='emailRegister'>
        <input class='inputsRegister' type='password' placeholder='Senha' id='passwordRegister'>           
        <button class='buttonRegister' id='firebaseRegister' type='button' > CADASTRAR </button>          
    </form>
    `;
    registerContainer.innerHTML = content;

  const register = registerContainer.querySelector('#firebaseRegister');
  register.addEventListener('click', () => {
    const nameElement = registerContainer.querySelector('#nameRegister');
    const lastnameElement = registerContainer.querySelector('#lastnameRegister');
    const userElement = registerContainer.querySelector('#userRegister');
    const emailElement = registerContainer.querySelector('#emailRegister');
    const passwordElement = registerContainer.querySelector('#passwordRegister');
    if (
      userElement.value === '' ||
      nameElement.value === '' ||
      lastnameElement.value === ''
    ) {
      alert('Por favor, preencha todos os campos.');
    } else {
      createUser(
        emailElement.value,
        passwordElement.value,
        nameElement.value,
        lastnameElement.value,
        userElement.value
      )
        .then(() =>
          userData(
            nameElement.value,
            lastnameElement.value,
            userElement.value,
            emailElement.value
          )
        )
        .then(() => {
          window.location.hash = '#login';
        })
        .catch(error => {
          console.error(error.message);
          if (error.message === 'Firebase: Error (auth/invalid-email).') {
            alert('Email inválido!');
          } else if (
            error.message ===
            'index.js?t=1679521157275:46 Firebase: Error (auth/internal-error).'
          ) {
            alert('Senha inválida');
          }
          alert('Erro ao cadastrar usuário, verifique os campos preenchidos!');
        });
    }
  });

  return registerContainer;
};
