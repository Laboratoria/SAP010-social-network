export default () => {
  const container = document.createElement("section");
  const templateLogin = `
    <div class="img-entrar">
      <img src="public/images/login-mobile.gif" alt="login-animation">
      <h1>ENTRAR</h1>
    </div>
    <div class="form_login">
      <form action="">
        <input type="email" class="input_email_login">
        <input type="password" class="input_pass_login">
        <a class="btn_entrar" href="/#feed"></a>
      </form>
      <p>ou continue com</p>
      <img src="public/images/google.svg" alt="google icon">
      <img src="public/images/github-mobile.svg" alt="github icon">
    </div>
  `;
  container.innerHTML = templateLogin;
  return container;
};
