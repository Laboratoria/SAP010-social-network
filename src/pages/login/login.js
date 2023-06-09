import { loginWithEmail, loginGoogle } from '../../firebase/auth.js';

// Definindo a função exportada como uma função anônima arrow.
export default () => {
  // Criando um elemento de contêiner div.
  const container = document.createElement('div');

  // Template HTML para o formulário de login.
  const templateLogin = /*html*/ `
  <section class="login-wrap">

    <div class = "left">
    <figure class="logo-container">
  <img src="img/logo.png" id="logo" alt="Logo da ExploraAí">
  </figure>
  <h1>ExplorAí</h1>
  <br>
  <h6 class= "left-text">COMPARTHILE EXPERIÊNCIAS E AVENTURAS.
    <br>
    RECEBA DICAS E INDICAÇÕES.
  </h6>
    </div>

  <div class= "right">
  <h2>Entrar</h2>
  <form class="login-form">
  <div class="inputs-container">
  <input type="text" class="inputs-info" placeholder="E-MAIL" id ="email" />
  <input type="password" class="inputs-info" placeholder="SENHA" id ="senha" />
  </div>

  <nav>
  <button type="button" id="login-button" href="#">ENTRAR</button>
  </nav>

  <div class="txt1">
  Esqueceu a senha? <br>
  Não possui uma conta? 
  <button type="button" class="register-button"><a class= "reg-btn" href="#register">Cadastre-se</a></button>
  </div>

  <div class="txt2">
  Ou <br>
  Entrar com:
  </div>

 <figure>
 <button class="google-btn">
  <img src="img/assets/google.png" id="google-img" alt="Logo do Google" width = 100px>
 </button> 
 </figure>
  </form>
</div>
  </section>`

  container.innerHTML = templateLogin;

  // Selecionando os elementos do formulário de login.
  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#login-button');

  // Função para lidar com o evento de login.
  const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Chamando a função de login com e-mail e senha.
    loginWithEmail(email, senha)
      .then(() => {
        // Redirecionando para a página de linha do tempo após o login bem-sucedido.
        window.location.hash = '#timeline';
      })
      .catch((error) => {
        // Exibindo um alerta em caso de falha de autenticação.
        alert('Usuário ou senha incorretos');
        console.log('Erro de autenticação:', error);
      });
  };

  // Adicionando um ouvinte de evento de clique ao botão de login.
  loginButton.addEventListener('click', handleLogin);

  // Retornando o elemento de contêiner.
  return container;

}
