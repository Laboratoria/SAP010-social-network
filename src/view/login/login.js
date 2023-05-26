import './login.css'
import {logIn} from '../../firebase/firebase.js'

export default () => {
  const userLogin = document.createElement("section");
  userLogin.classList.add("container-login")
  const templateLogin = `
    <div class="img-entrar">
      <img src="/images/login-mobile.gif" alt="login-animation">
      <h1>ENTRAR</h1>
    </div>
    <div class="form-login">
      <form action="">
        <input type="email" class="input-email-login" placeholder="E-MAIL" required>
        <input type="password" class="input-pass-login" placeholder="SENHA" required>
        <a class="btn-entrar" href="/#feed">Entrar</a>
      </form>
      <p>ou continue com</p>
      <img src="/images/google.svg" alt="google icon">
      <img src="/images/github-mobile.svg" alt="github icon">
    </div>
  `;
  userLogin.innerHTML = templateLogin;
 
  const emailInput = userLogin.querySelector(".input-email-login");
  const passInput = userLogin.querySelector(".input-pass-login");
  const btnLogin = userLogin.querySelector(".btn-entrar");
  
  btnLogin.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passInput.value;

    const promise = logIn(email, password);
    promise.catch(e => console.log(e.message)); 
  }) 

  return userLogin;
}; 


