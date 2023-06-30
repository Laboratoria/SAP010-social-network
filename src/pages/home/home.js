import { loginUser, loginGoogle } from "../../lib";

export default () => {
  const container = document.createElement("div");

  const template = `
  <div class="container" id="container-template">
  <header>
    <img class="logo" src="imagens/logo mania.png" alt="logo" />
  </header>
       <form class="form" id="form">
           <img class="etiqueta" src="imagens/etiqueta de desconto preta.png" alt="etiqueta" />
           <h2>  A REDE SOCIAL PARA QUEM <br>GOSTA DE ECONOMIZAR!</h2>
           <p class="email">
           <input type="text" class="inserir_email" id="inseriremail" placeholder="Digite seu e-mail"/>
           </p>
           <p class="senha">
           <input type="password" class="digite_senha" id="digitesenha" placeholder="Digite sua senha"/>
           <i class="bi bi-eye-fill" id="olinho-visual"></i> 
           </p> 
       </form>
      
       <p class="form">
         <button class="btnLogar" id="btnLogar">LOGAR</button>
       </p>
       <span id='usuarioAlertHome' class='alertHome'></span>
       <p class="form">
         <button class="logarGoogle" id="btnGoogle"><img src="imagens/google.png"> Entrar com Google</button>
       <p class="form">
         <a href="/#cadastrar" type="button" class="btnCadastrar" id="btnCadastrar">CADASTRE-SE</a>
       </p>
       
</div>
      
    
    `;
  
container.innerHTML = template;


  const logar = container.querySelector(".btnLogar");
  logar.addEventListener("click", () => {
    const email = container.querySelector(".inserir_email");
    const password = container.querySelector(".digite_senha");

    loginUser(email.value, password.value)
      .then(() => {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (email.value === "" || password.value === "") {
          usuarioAlertHome.setAttribute('style', 'display: block');
          usuarioAlertHome.innerHTML = "Todos os campos devem ser preenchidos!";
        }
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          usuarioAlertHome.setAttribute('style', 'display: block');
          usuarioAlertHome.innerHTML = "Usuário não cadastrado!";
        }
        if (errorMessage === "Firebase: Error (auth/invalid-email).") {
          usuarioAlertHome.setAttribute('style', 'display: block');
          usuarioAlertHome.innerHTML = "E-mail inválido!";
        }
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          usuarioAlertHome.setAttribute('style', 'display: block');
          usuarioAlertHome.innerHTML = "Senha inválida!";
        }
      });
  });

  const btnGoogle = container.querySelector(".logarGoogle");
  btnGoogle.addEventListener("click", () => {
    loginGoogle()
      .then(() => {
        window.location.hash = "#feed";
      })
      .catch((error) => {
        const errorCode = errosValid(error.code);
        alert(errorCode);
      });
  });
  //função olho
  const passwordImput = container.querySelector("#digitesenha");
  const olho = container.querySelector("#olinho-visual");
  olho.addEventListener("click", () => {
    let ImputTypePassoword = passwordImput.type === "password";

    if (ImputTypePassoword) {
      // se for passowrd qual é ação
      showPassord();
    } else {
      // se não for qual ação deve tomar
      hidePassword();
    }
  });
  function showPassord() {
    passwordImput.setAttribute("type", "text");

    olho.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
  }
  function hidePassword() {
    passwordImput.setAttribute("type", "password");

    olho.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
  }

  return container;
};
