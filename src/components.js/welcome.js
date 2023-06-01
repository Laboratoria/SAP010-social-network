import { loginUser, loginGoogle } from '../lib/index.js';

export const welcome = () => {
  const root = document.getElementById('root');

  const signInHTML = `
    <div class="divSignIn">
      <img src="img/logo_petchat.jpeg" class="logo">
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
    const email = inputEmail.value;
    const password = inputPass.value;

    try {
      loginUser(email, password);
      // Se o login estiver correto chama a pagina do feed(comentário)
      window.location.hash = '/feed';
    } catch (error) {
      // Se não mostra o erro
      alert('[ERRO] Dados inválidos, por favor tente de novo');
    }
  });

  btnRegister.addEventListener('click', () => {
    // Direciona para a pagina de registro
    window.location.hash = '/register/js';
  });

  btnGoogle.addEventListener('click', async () => {
    try {
      loginGoogle();
      // Feito o Login direciona para a area de comentários
      window.location.hash = '/feed.js';
    } catch (error) {
      // Msg de erro
      alert('[ERRO] ao se conectar a conta Google, tente de novo');
    }
  });
};

// Call renderSignInPage to render the sign-in page
welcome();
