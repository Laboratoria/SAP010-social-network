import { auth } from '../../firebase/firebaseConfig.js';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const header = document.querySelector('header');

const image = document.createElement('img');
image.src = '../../img/balao.jpg'
image.alt = 'balão';
const titulo = document.createElement('h2')
titulo.innerHTML="TravellersBook"

header.appendChild(image);
header.appendChild(titulo);

export const login = () => {
  const loginContainer = document.createElement('div');

  const content = `
    <section class="inputs">
      <input type="email" id="input-email" placeholder="e-mail" />
      <br />
      <p><input type="password" id="input-password" placeholder="senha" /></p>
      <button id="button-login">Entrar</button>
    </section>

    <section class="google">
      <br />
      <button id="button-login-google">Google</button>
    </section>

    <section class="createNewAccount">
      <br />
      <button id="button-new-account">Criar nova conta</button>
      <!--criar um link de redirecionameto para criar nova conta, para usar a função implementada no js-->
    </section>
  `

  loginContainer.innerHTML = content;

  setUpLoginElements(loginContainer)

  return loginContainer
}

function setUpLoginElements(loginContainer) {
  const buttonLogin = loginContainer.querySelector('#button-login');
  const buttonNewAccount = loginContainer.querySelector('#button-new-account');
  const buttonLoginGoogle = loginContainer.querySelector('#button-login-google');
  const inputEmail = loginContainer.querySelector('#input-email');
  const inputPassword = loginContainer.querySelector('#input-password');

  buttonLogin.addEventListener('click', event => {
    const email = inputEmail.value;
    const password = inputPassword.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // O login foi realizado com sucesso
        const user = userCredential.user;
        console.log(user);
        // Redirecione para a página principal ou execute outra ação necessária
      })
      .catch(error => {
        // Ocorreu um erro durante o login
        switch(error.code) {
          case "auth/user-not-found":
            alert ("Usuário não encontrado");
            break

          case "auth/wrong-password":
            alert ("Senha incorreta")
            break

          case "auth/invalid-email":
            alert ("E-mail inválido")
            break

          case "auth/missing-password":
            alert ("Digite a senha")
            break

          default:
            alert ("Erro ao fazer o login: "+error.code)
          }
      });
  });

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
    const email = inputEmail.value;
    const password = inputPassword.value;
    console.log('email:' + email + ' senha:' + password);

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed
        const user = userCredential.user;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
}