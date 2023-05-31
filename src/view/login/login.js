import './login.css'
import meninaLogin from '../../images/login.svg'
import googleImg from '../../images/google.svg'
import githubImg from '../../images/github-mobile.svg'
import {logIn, signInWithGoogle, signInWithGitHub} from '../../firebase/firebase.js'

export default () => {
  const userLogin = document.createElement("section");
  userLogin.classList.add("container-login")
  const templateLogin = `
    <div class="container-img-entrar">
      <img class="img-menina-login" src=${meninaLogin} alt="login-animation">
      <h1 class="text-mobile-version">ENTRAR</h1>
    </div>
    <div class="form-login">
      <h1 class="text-desktop-version">ENTRAR</h1>
      <form>
        <input type="email" class="input-email-login" placeholder="E-MAIL" required>
        <span id="email-alert" class="input-error"></span>
        <input type="password" class="input-pass-login" placeholder="SENHA" required>
        <span id="pass-alert" class="input-error"></span>
        <a class="btn-entrar" href="/#feed">Entrar</a>
      </form>
      <p>ou continue com</p>
      <picture class="login-icons">
        <img class="btn-google" src=${googleImg} alt="google icon">
        <img class="btn-github" src=${githubImg} alt="github icon">
      </picture>
      <p class="dont-have-an-account">Não possui uma conta?<a class="create-account" href="/#register">Criar conta agora</a></p>
    </div>
  `;
  userLogin.innerHTML = templateLogin;
 
  const emailInput = userLogin.querySelector(".input-email-login");
  const passInput = userLogin.querySelector(".input-pass-login");
  const btnLogin = userLogin.querySelector(".btn-entrar");
  const loginGoogle = userLogin.querySelector(".btn-google");
  const loginGitHub = userLogin.querySelector(".btn-github");
  const validateEmailErrorInput = userLogin.querySelector(".input-email-login").value;
  const emailAlert = userLogin.querySelector("#email-alert");
  const validatePassErrorInput = userLogin.querySelector(".input-pass-login").value;
  const passAlert = userLogin.querySelector("#pass-alert");
  
  function validateEmail(){
    if(!validateEmailErrorInput){
      emailAlert.textContent = "Insira um e-mail válido"
    }
  }

  function validatePassword(){
    if(!validatePassErrorInput){
      passAlert.textContent = "Insira uma senha válida"
    }
  }

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passInput.value;
    const promise = logIn(email, password);
    promise.catch(e => console.log(e.message)); 
    validateEmail();
    validatePassword();
  }) 

  loginGoogle.addEventListener('click', () => {
    signInWithGoogle();
  })

  loginGitHub.addEventListener('click', () => {
    signInWithGitHub();
  })

  return userLogin;
}; 


