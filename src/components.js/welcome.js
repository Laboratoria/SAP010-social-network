import { loginUser, loginGoogle } from '../lib/index.js';

export const welcome = () => {
  const container = document.createElement('div');

  const signInHTML = `
<section class="mainPage">
  <img src="img/comunicacao.jpg" class="bg">
    <div class="divSignIn">
      <img src="img/logo_petchat.png" class="logoW">
         <p class="introSignIn">Bem-vindo(a) ao <strong>PetChat</strong></p>
         <label class='label' for="email">E-mail:</label>

         <div class="inputGroup">
           <i class="material-icons inputIcon">person_outline</i>
           <input type="email" class="inputSignIn" id="email" placeholder="example@youremail.com" required>
         </div>

         <label class='label' for="pass">Senha:</label>
         <div class="inputGroup">
           <i class="material-icons inputIcon">lock</i>
             <input type="password" class="inputSignIn" id="pass" placeholder="*******" required minlength="6">
         </div>

         <button class="btnSignIn active">Sign In</button>
         <button class="btnRegister">Cadastro</button>
    
         <button class="btnGoogle">
           <img class="img-google" src="img/google_logo.png"/>
             Sign in com o Google
         </button>
    </div>
</section>
`;

  container.innerHTML = signInHTML;

  const inputEmail = container.querySelector('.inputSignIn[type="email"]');
  const inputPass = container.querySelector('.inputSignIn[type="password"]');
  const btnSignIn = container.querySelector('.btnSignIn');
  const btnRegister = container.querySelector('.btnRegister');
  const btnGoogle = container.querySelector('.btnGoogle');

  btnSignIn.addEventListener('click', async () => {
    const email = inputEmail.value;
    const password = inputPass.value;
    if (email && password) {
      try {
        await loginUser(email, password);
        window.location.hash = '#feed';
      } catch (error) {
        alert('Ocorreu um erro. E-mail ou senha não correspondem com o cadastro, tente novamente.');
      }
    }
  });

  btnRegister.addEventListener('click', () => {
    // Direciona para a pagina de registro
    window.location.hash = '#register';
  });

  btnGoogle.addEventListener('click', async () => {
    loginGoogle()
      // Feito o Login direciona para a area de comentários
      .then(() => {
        window.location.hash = '#feed';
      })

      .catch(() => {
        alert('Ocorreu um erro ao criar o seu cadastro, por favor tente novamente.');
      });
  });

  return container;
};
