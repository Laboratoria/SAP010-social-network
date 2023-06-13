const template = `
  <div class="backgroundTwo">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" class="shape-fill"></path>
    </svg>
  </div>
  <div class="imagens">
    <img class="imagemLogo" src="Img/ImagemDesktopmap.png" alt= "Imagem Ilustrativa de pessoas interagindo">
    <img class="imagemMap" src="Img/ImagemMap.png" alt= "Mapa de GPS Ilustrativo">
  </div>
  <section class="login-page">
    <section class="form">
      <form class="login-form show" method="post" id="login">
        <section class="titulos">
          <h1 class="titulo">Food Review</h1>
          <p class="subtitulo1">O melhor site de avaliações do Brasil</p>
          <p class="subtitulo2">Acesse e saiba mais!!</p>
        </section>
        <section>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Senha" required/>
          <button type="submit" name="send2">Entrar</button>
          <p class="subtitulo2">Ou</p>
          <img class="logo" src="Img/Google.png" alt= "Logo Google">
          <img class="logo" src="Img/facebook.png" alt= "Logo Facebook">
          <p class="message">Não possui uma conta? <a href="#" id="newAccount">Cadastrar</a></p>
        </section>
      </form>
      <form class="register-form" method="POST" id="register">
        <h1 class="titulo">Food Review</h1>
        <p class="subtitulo2">Preencha os campos abaixo:</p>
        <input type="text" placeholder="Nome completo *" required/>
        <input type="email" placeholder="Email *" required/>
        <input type="password" placeholder="Senha *" required/>
        <button type="submit">Cadastrar</button>
        <button type="submit" id="signup">Voltar</button>
        <p class="message">Já tem uma conta? Clique em voltar e acesse com seu email e senha.</a></p>
      </form>
    </section>
  </section>
`;

const scripts = () => {
  const newAccount = document.querySelector("#newAccount");

  newAccount.onclick = () => {
    const register = document.querySelector("#register");
    register.classList.add("show");

    const login = document.querySelector("#login");
    login.classList.remove("show");
  };

  const signup = document.querySelector("#signup");

  signup.onclick = () => {
    const register = document.querySelector("#register");
    register.classList.remove("show");

    const login = document.querySelector("#login");
    login.classList.add("show");
  };
};

const main = async () => {
  const root = document.querySelector("#root");
  root.innerHTML = template;
  scripts();
};

export default main;
