import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const login = () => {
  const container = document.createElement("div");
  const auth = getAuth();
  
  const templateLogin = `
    <img src="./img/logo.png" class="logo-repet" alt="Logo da rede social re.Pet">
    <section class="loginpage-form">
    <form>
    <label for="email-login"></label>
    <input class="form-inputs" type="email" id="email-login" required placeholder="Email">
    </input>
    
    <label for="senha-login"></label>
    <input type="password" class="form-inputs" id="senha-login" required placeholder="Senha">
    </input>

    <button type="submit" class="loginpage-button">Entrar</button>

    </form>

    <button type="submit" id="botao-google"> Entrar com Google</button>

    <h3> Não possui cadastro? <a class="criar-conta" href="/#cadastro">Criar conta</a></h3>
    </section>
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





