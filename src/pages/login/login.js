import {
  loginWithEmail,
  loginGoogle,
  loginFacebook,
} from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const templateLogin = `
    <section class='login-wrap'>
    
      <div class='left'>
        <figure class='logo-container'>
          <img src='img/logo.png' id='logo' alt='Logo da ExploraAí'>
        </figure>
        <h1>ExplorAí</h1>
        <br>
        <h6 class='left-text'>COMPARTILHE EXPERIÊNCIAS E AVENTURAS.
          <br>
          RECEBA DICAS E INDICAÇÕES.
        </h6>
      </div>

      <div class='right'>
          <form class='login-form'>
          <br>
          <h2>Entrar</h2>
          <div class='inputs-container'>
            <input type='text' class='inputs-info' placeholder='E-MAIL' id='email' />
            <input type='password' class='inputs-info' placeholder='SENHA' id='senha' />
          </div>

          <nav>
            <button type='button' id='login-button' href='#'>ENTRAR</button>
          </nav>

          <div class='txt1'>
            Esqueceu a senha? <br>
            Não possui uma conta?
            <button type='button' class='register-button'><a class='reg-btn' href='#register'>Cadastre-se</a></button>
          </div>

          <div class='txt2'>
            Ou <br>
            Entrar com:
          </div>

          <figure>
            <button type='button' class='google-btn' id='google-btn'>
              <img src='img/assets/google.png' id='google-img' alt='Logo do Google' width='100px'>
            </button>
            <button type='button' class='facebook-btn' id='btn-facebook'>
              <img src='img/assets/facebook.png' id='facebook-img' alt='Logo do facebook' width='100px'>
            </button>
          </figure>
        </form>
      </div>
    </section>`;

  container.innerHTML = templateLogin;

  // Selecionando os elementos do formulário de login.
  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#login-button');
  const googleButton = container.querySelector('#google-btn');
  const facebookButton = container.querySelector('#btn-facebook');

  // Função para lidar com o evento de login.
  const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Chamando a função de login com e-mail e senha.
    loginWithEmail(email, senha)
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        alert('Usuário ou senha incorretos');
      });
  };

  // Função para lidar com o evento de login com o Google.
  const handleGoogleLogin = () => {
    loginGoogle()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        alert('Erro ao fazer login com o Google');
      });
  };

  const handleFacebookLogin = () => {
    loginFacebook()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        alert('Erro ao fazer login com o Facebook');
      });
  };

  loginButton.addEventListener('click', handleLogin);

  googleButton.addEventListener('click', handleGoogleLogin);

  facebookButton.addEventListener('click', handleFacebookLogin);

  return container;
};
