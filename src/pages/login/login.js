import { auth } from '../../firebase/firebaseConfig.js';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// cria e retorna uma div com os elementos HTML da pagina de login
export const login = () => {
  // foi criada uma varíavel div para guardar o conteúdo na página de login.
  const loginContainer = document.createElement('div');
  loginContainer.classList.add('login-container')

  const content = `
    <section class="section-logo">
      <img src="../img/balão1.png" alt="balão"></img>
      <h2>TravellersBook</h2>
    </section>

    <section class="form-login">
      <span class="text-title">Faça seu login</span>
      <input class="input-login" type="email" id="input-email" placeholder="user@email.com" />
      <input class="input-login" type="password" id="input-password" placeholder="senha" />
      <button class="button-login" id="button-login">Entrar</button>
      <span class="text-google">ou acesse com sua conta Google:</span>
      <button class="button-login-google" id="button-login-google">
         <img src="../img/googlelogo.png" alt="Logo Google" class="logo-google">
      </button>
      <span class="text-new-account">ainda não tem conta?</span>
      <button class="button-new-account" id="button-new-account">Crie uma conta</button>
      <!--criar um link de redirecionameto para criar nova conta, para usar a função implementada no js-->
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
  const buttonLogin = loginContainer.querySelector('#button-login');
  const buttonNewAccount = loginContainer.querySelector('#button-new-account');
  const buttonLoginGoogle = loginContainer.querySelector(
    '#button-login-google'
  );
  const inputEmail = loginContainer.querySelector('#input-email');
  const inputPassword = loginContainer.querySelector('#input-password');

  buttonLogin.addEventListener('click', event => {
    const email = inputEmail.value;
    const password = inputPassword.value;

    // tenta fazer o login usando e-mail e senha cadastrado.
    // e retorna um Promisse que tem 2 callbacks
    signInWithEmailAndPassword(auth, email, password)
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
            alert('Usuário não encontrado');
            break;

          case 'auth/wrong-password':
            alert('Senha incorreta');
            break;

          case 'auth/invalid-email':
            alert('E-mail inválido');
            break;

          case 'auth/missing-password':
            alert('Digite a senha');
            break;

          default:
            alert('Erro ao fazer o login: ' + error.code);
        }
      });
  });

  // login Google usa o GoogleAuthProvider para criar o provider usado no signInWithPopup
  const provider = new GoogleAuthProvider();
  buttonLoginGoogle.addEventListener('click', event => {
    signInWithPopup(auth, provider)
      .then(result => {
        // O login com o Google foi bem-sucedido, você pode acessar as informações do usuário através de result.user
        const user = result.user;
      })
      .catch(error => {
        // Ocorreu um erro durante o login com o Google
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });

  // Após link de redirecionamento para criar nova conta, implementar botão para utilizar essa função.
  buttonNewAccount.addEventListener('click', event => {
      window.location.hash = "#register"
  });
}
