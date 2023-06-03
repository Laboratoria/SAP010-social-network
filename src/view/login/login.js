import './login.css'
import meninaLogin from '../../images/login.svg'
import googleImg from '../../images/google.svg'
import githubImg from '../../images/github-mobile.svg'
import { logIn, signInWithGoogle, signInWithGitHub, auth } from '../../firebase/firebase.js'

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
  const EmailErrorInputValue = userLogin.querySelector(".input-email-login").value;
  const EmailErrorInput = userLogin.querySelector(".input-email-login");
  const emailAlert = userLogin.querySelector("#email-alert");

  const PassErrorInputValue = userLogin.querySelector(".input-pass-login").value;
  const PassErrorInput = userLogin.querySelector(".input-pass-login")
  const passAlert = userLogin.querySelector("#pass-alert");

  function validateEmail() {
    if (!EmailErrorInputValue) {
      emailAlert.textContent = "Insira um e-mail válido";
    }
  };

  function validatePassword() {
    if (!PassErrorInputValue) {
      passAlert.textContent = "Insira uma senha válida";
    }
  };

  EmailErrorInput.addEventListener("input", () => {
    emailAlert.textContent = "";
  });

  PassErrorInput.addEventListener("input", () => {
    passAlert.textContent = "";
  });

  btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passInput.value;

    if (email !== "") {
      emailAlert.textContent = "";
    } else {
      validateEmail();
    }
    if (password !== "") {
      passAlert.textContent = "";

    } else {
      validatePassword();
    }

    try {

      await logIn(email, password);

      if(auth.currentUser){
        window.location.href = "#feed";
      } 

    } catch(error) {

      console.log(error.message);

    };

  })

  loginGoogle.addEventListener('click', async () => {
    
    try{

      await signInWithGoogle();

      if(auth.currentUser){
        window.location.href = "#feed";
      } 

    } catch(error) {

      console.log(error.message);

    }
    
  })

  loginGitHub.addEventListener('click', async () => {
    
    try {
      
      await signInWithGitHub();

      if(auth.currentUser){
        window.location.href = "#feed";
      } 

    } catch(error){

      console.log(error.message);

    }
  
  })

  return userLogin;
};


