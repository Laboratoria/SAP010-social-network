import { createUser } from '../../fireBase/firebaseAuth.js';
import { userData } from '../../fireBase/firebaseStore.js';

export default () => {
  const loginContainer = document.createElement('div');
  loginContainer.classList.add('login-container');

  const content = `
    
    <header class='header-register display' >
       
    </header>
    
    <form class='section-login section-register display'>
        <h1> CADASTRE-SE </h1>
        <input type='text' placeholder='Nome' id='nameRegister'>
        <input type='text' placeholder='Sobrenome' id='lastnameRegister'>
        <input type='text' placeholder='Usuário' id='userRegister'>
        <input type='email' placeholder='Email' id='emailRegister'>
        <input type='password' placeholder='Senha' id='passwordRegister'>           
        <button class='buttonRegister' id='firebaseRegister' type='button' > CADASTRAR </button>          
    </form>
    `;
  loginContainer.innerHTML = content;

  const register = loginContainer.querySelector('#cadastro-firebase');
  register.addEventListener('click', () => {
    const nome = loginContainer.querySelector('#nome-fulana');
    const sobrenome = loginContainer.querySelector('#sobrenome-fulana');
    const usuario = loginContainer.querySelector('#usuario-fulana');
    const email = loginContainer.querySelector('#email-cadastro');
    const senha = loginContainer.querySelector('#senha-cadastro');
    if (usuario.value === '' || nome.value === '' || sobrenome.value === '') {
      alert('Por favor, preencha todos os campos.');
    } else {
      createUser(
        email.value,
        senha.value,
        nome.value,
        sobrenome.value,
        usuario.value
      )
        .then(() =>
          userData(nome.value, sobrenome.value, usuario.value, email.value)
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
  return loginContainer;
};
