const template = `
  <div class="login-page">
    <div class="form">
      <form class="register-form" method="POST" id="register">
        <h2><i class="fas fa-lock"></i> Registrar</h2>
        <input type="text" placeholder="Nome completo *" required/>
        <input type="text" placeholder="Usuário *" required/>
        <input type="email" placeholder="Email *" required/>
        <input type="password" placeholder="Senha *" required/>
        <button type="submit">criar</button>
        <p class="message">Já tem uma conta? <a href="#" id="signup">Entrar</a></p>
      </form>
      <form class="login-form show" method="post" id="login">
        <h2><i class="fas fa-lock"></i>Login</h2>
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Senha" required/>
        <button type="submit" name="send2">Entrar</button>
        <p class="message">Não tem registro? <a href="#" id="newAccount">Criar conta</a></p>
      </form>
    </div>
  </div>
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
