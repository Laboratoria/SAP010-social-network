import {
  signIn,
  signInGoogle,
} from '../../fireBase/firebaseAuth';

// cria e retorna uma div com os elementos HTML da pagina de login
export const getLoginPage = () => {
  // foi criada uma varíavel div para guardar o conteúdo na página de login.
  const loginContainer = document.createElement('div');
  loginContainer.classList.add('login-container')

  const content = `
  <section class="container">
    <section class="section-logo">
      <img src="../img/balão1.png" alt="balão"></img>
      <h2>TravellersBook</h2>
    </section>
    <section class="texto-login">
    <h4>Imagine ter acesso a um mundo de conhecimento de viajantes experientes, prontos para compartilhar suas dicas e segredos para criar viagens inesquecíveis.  Aqui você pode explorar destinos exóticos, cidades vibrantes e gastronomias incríveis  de forma mais autêntica. <br><br>
    Prepare-se para voar por um universo de descobertas. Na TravellersBook acreditamos que a viagem é muito mais do que um destino - é uma jornada enriquecedora que nos conecta e nos transforma.</h4>
    </section>
    </section>

    <section class="container">
    <h4>Explore, compartilhe, viaje com seu guia pessoal de aventuras.</h4>
    <form class="form-login">
      <span class="text-title">Faça seu login</span>
      <input class="input-login" type="email" id="input-email" placeholder="user@email.com" />
      <span class="text-email-error"></span>
      <input class="input-login" type="password" id="input-password" placeholder="senha" />
      <span class="text-password-error"></span>
      <button class="button-login" id="button-login" type="submit">Entrar</button>
      <span class="text-google">ou acesse com sua conta Google:</span>
      <button class="button-login-google" id="button-login-google" type="button">
         <img src="../img/googlelogo.png" alt="Logo Google" class="logo-google">
      </button>
      <span class="text-new-account">ainda não tem conta?</span>
      <button class="button-new-account" id="button-new-account" type="button">Crie uma conta</button>
      <!--criar um link de redirecionameto para criar nova conta, para usar a função implementada no js-->
    </form>
    </section>
  `
  // o content é uma string que tem o conteúdo da página HTML
  // loginContainer é a div. o innerHTML é um atributo da div que é um "valor", tudo que está dentro da tag do elemento.
  loginContainer.innerHTML = content;

  //foi criada para configurar os eventos dos elementos da página.
  //essa função foi criada para ficar mais legível. Foi separada em 2 partes para não ficar gigante.
  setUpLoginElements(loginContainer)

  return loginContainer;
};

// é uma função que recebe a div do login como parâmetro e cria os eventos de click nos botões.
function setUpLoginElements(loginContainer) {
  const formLogin = loginContainer.querySelector('.form-login');
  const buttonNewAccount = loginContainer.querySelector('#button-new-account');
  const buttonLoginGoogle = loginContainer.querySelector('#button-login-google');
  const inputEmail = loginContainer.querySelector('#input-email');
  const textEmailError = loginContainer.querySelector(".text-email-error");
  const textPasswordError = loginContainer.querySelector(".text-password-error")
  const inputPassword = loginContainer.querySelector('#input-password');

  formLogin.addEventListener('submit', event => {
    event.preventDefault();

    inputEmail.classList.remove('input-error');
    textEmailError.innerHTML = ""

    inputPassword.classList.remove('input-error');
    textPasswordError.innerHTML = ""


    const email = inputEmail.value;
    const password = inputPassword.value;

    // tenta fazer o login usando e-mail e senha cadastrado.
    // e retorna um Promisse que tem 2 callbacks
    signIn(email, password)
      // em caso de sucesso chama a função criada dentro do then
      .then(userCredential => {
        // O login foi realizado com sucesso
        const user = userCredential.user;
        window.location.hash = "#homepage"
        // Redirecione para a página principal ou execute outra ação necessária
      })
      // em caso de erro chama a função criada dentro do catch
      .catch(error => {
        // Ocorreu um erro durante o login
        switch (error.code) {
          case 'auth/user-not-found':
            inputEmail.classList.add('input-error')
            textEmailError.innerHTML = "Usuário não encontrado";
            break;

          case 'auth/invalid-email':
            inputEmail.classList.add('input-error');
            textEmailError.innerHTML = "E-mail inválido";
            break;

          case 'auth/wrong-password':
            inputPassword.classList.add('input-error');
            textPasswordError.innerHTML = "Senha incorreta";
            break;

          case 'auth/missing-password':
            inputPassword.classList.add('input-error');
            textPasswordError.innerHTML = "Digite a senha";
            break;

          default:
            textPasswordError.innerHTML = "Erro ao fazer o login: " + error.code;
        }
      });
  });

  // login Google usa o GoogleAuthProvider para criar o provider usado no signInWithPopup
  buttonLoginGoogle.addEventListener('click', event => {
    signInGoogle()
    .then(result => {
      // O login com o Google foi bem-sucedido, você pode acessar as informações do usuário através de result.user
      const user = result.user;
      window.location.hash = "#homepage"
    })
    .catch(error => {
      // Ocorreu um erro durante o login com o Google
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  });

  buttonNewAccount.addEventListener('click', event => {
      window.location.hash = "#register"
  });
}
