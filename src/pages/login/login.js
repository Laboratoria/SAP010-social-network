

export default () => {
  const container = document.createElement('div');

  const templateLogin = `
  <div class="login-wrap">
  <img src="img/logo.png" id="logo" alt="Logo da ExploraAí">
  <h2>Entrar</h2>

  <form>
  <div id="info-inputs">
  <input type="text" placeholder="E-mail" id ="email" />
  <input type="password" placeholder="Senha" id ="senha" />
  </div>

  <div>
  <button type="button" id="login-button" href="#">Entrar</button>
  </div>

  <div>
  Esqueceu a senha? <br>
  Não possui uma conta? <button type="button" id="register-button" href="#">Cadastre-se</button>
  </div>

  <div>
  Ou <br>
  Entrar com:
  </div>

  <div>
  <img src="img/assets/google.png" id="google" alt="Logo do Google" width = 100px> 
  </div>


  </form>
 
</div>` /*inserir o login do google em forma de botao posteriormente */

container.innerHTML = templateLogin;

return container;

}
