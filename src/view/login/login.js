export default () => {
  const container = document.createElement("section");
  container.classList.add("container-login")
  const templateLogin = `
    <div class="img-entrar">
      <img src="assets/images/login-mobile.gif" alt="login-animation">
      <h1>ENTRAR</h1>
    </div>
    <div class="form-login">
      <form action="">
        <input type="email" class="input-email-login">
        <input type="password" class="input_pass_login">
        <a class="btn_entrar" href="/#feed"></a>
      </form>
      <p>ou continue com</p>
      <img src="assets/images/google.svg" alt="google icon">
      <img src="assets/images/github-mobile.svg" alt="github icon">
    </div>
  `;
  container.innerHTML = templateLogin;
  return container;
};
