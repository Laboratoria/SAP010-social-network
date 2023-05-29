import './login.css'
import meninaLoginMobile from '../../images/login-mobile.gif'
import meninaLoginDesktop from '../../images/login-desktop.gif'
import googleImg from '../../images/google.svg'
import githubImg from '../../images/github-mobile.svg'
import githubImgDesktop from '../../images/github.svg'
import {logIn, signInWithGoogle, signInWithGitHub} from '../../firebase/firebase.js'

export default () => {
  const userLogin = document.createElement("section");
  userLogin.classList.add("container-login")
  const templateLogin = `
    <div class="container-img-entrar">
      <img class="img-mobile-version" src=${meninaLoginMobile} alt="login-animation">
      <img class="img-desktop-version" src=${meninaLoginDesktop} alt="login-animation">
      <h1 class="text-mobile-version">ENTRAR</h1>
    </div>
    <div class="form-login">
      <h1 class="text-desktop-version">ENTRAR</h1>
      <form>
        <input type="email" class="input-email-login" placeholder="E-MAIL" required>
        <input type="password" class="input-pass-login" placeholder="SENHA" required>
        <a class="btn-entrar" href="/#feed">Entrar</a>
      </form>
      <p>ou continue com</p>
      <picture class="login-icons">
        <img class="btn-google" src=${googleImg} alt="google icon">
        <img class="btn-github" src=${githubImg} alt="github icon">
      </picture>
    </div>
  `;
  userLogin.innerHTML = templateLogin;
 
  const emailInput = userLogin.querySelector(".input-email-login");
  const passInput = userLogin.querySelector(".input-pass-login");
  const btnLogin = userLogin.querySelector(".btn-entrar");
  const loginGoogle = userLogin.querySelector(".btn-google");
  const loginGitHub = userLogin.querySelector(".btn-github");
  
  btnLogin.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passInput.value;

    const promise = logIn(email, password);
    promise.catch(e => console.log(e.message)); 
  }) 

  loginGoogle.addEventListener('click', () => {

    signInWithGoogle();

  })

  loginGitHub.addEventListener('click', () => {

    signInWithGitHub();

  })

  return userLogin;
}; 


