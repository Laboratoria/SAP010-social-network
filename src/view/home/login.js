import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const login = () => {
  const container = document.createElement("div");
  const auth = getAuth();
  
  const templateLogin = `
    
    <section class="loginpage-form">
    <img src="./img/logo.png" class="logo-repet" alt="Logo da rede social re.Pet">
    <form class="login-input-container">
    <label for="email-login"></label>
    <input class="form-inputs" type="email" id="email-login" required placeholder="Email">
    </input>
    
    <label for="senha-login"></label>
    <input type="password" class="form-inputs" id="senha-login" required placeholder="Senha">
    </input>

    <button type="submit" class="loginpage-button">Entrar</button>
    
    </form>
    <div class="google-login">
      <div class="google-icon-wrapper">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div> 
      <a class="google-button-text"> Entrar com o Google </a> 
    </div>

    </section>


    <button type="submit" id="botao-google"> Entrar com Google</button>


    
    <h3> Não possui cadastro? <a class="criar-conta" href="/#cadastro">Criar conta</a></h3>
    
  
    `;

  container.innerHTML = templateLogin;

  container.querySelector("#botao-google").addEventListener("click", handleGoogleSignIn);

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
  
    signInWithPopup (auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
  
  }

  return container;
  };





