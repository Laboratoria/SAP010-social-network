import { loginUser, loginGoogle } from '../lib/index.js';

export const welcome = () => {
  const root = document.createElement('div');

  const signInHTML = `
    <div class="divSignIn">
      <img src="img/logo_petchat.png" class="logo">
      <p class="introSignIn">Benvindo(a) ao PetChat</p>
      <input type="email" class="inputSignIn" placeholder="example@youremail.com" required>
      <input type="password" class="inputSignIn" placeholder="*******" required minlength= 6>
      <button class="btnSignIn">Sign In</button>
      <button class="btnRegister">Cadastro</button>
      <p class="introSignIn">or</p>
      <button class="btnGoogle">
        <img class="img-google" src="img/google_logo.png"/>
        Sign in com o Google
      </button>
    </div>`;

  root.innerHTML = signInHTML;

  const inputEmail = root.querySelector('.inputSignIn[type="email"]');
  const inputPass = root.querySelector('.inputSignIn[type="password"]');
  const btnSignIn = root.querySelector('.btnSignIn');
  const btnRegister = root.querySelector('.btnRegister');
  const btnGoogle = root.querySelector('.btnGoogle');



  btnSignIn.addEventListener('click', async () => {
    const email = inputEmail;
    const password = inputPass;

    if (email.value && password.value) {
      loginUser(email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          window.location.hash = '#feed';
        })

        .catch((error) => {

          alert(
            'Ocorreu um erro. E-mail ou senha não correspondem com o cadastro, tente novamente.'
          );
        });
    };
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

      .catch((error) => {

        alert(
          'Ocorreu um erro ao criar o seu cadastro, por favor tente novamente.'
        );
      });
  });

  return root;
};
