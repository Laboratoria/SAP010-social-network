// export function mostrarFormularioLogin() {
//   const body = document.getElementsByTagName('body')[0];
//   body.innerHTML = '';

//   const formularioLogin = createDiv('formularioLogin');

//   const loginTitulo = createHeading('h2', 'Login');
//   formularioLogin.appendChild(loginTitulo);

//   const emailInput = createInput('email', 'E-MAIL');
//   formularioLogin.appendChild(emailInput);

//   const senhaInput = createInput('password', 'SENHA');
//   formularioLogin.appendChild(senhaInput);

//   const entrarBtn = createButton('ENTRAR');
//   formularioLogin.appendChild(entrarBtn);

//   const criarNovaConta = createButton('CRIAR NOVA CONTA');
//   formularioLogin.appendChild(criarNovaConta);

//   body.appendChild(formularioLogin);
// }

// function createDiv(id) {
//   const div = document.createElement('div');
//   div.id = id;
//   return div;
// }

// function createHeading(type, text) {
//   const heading = document.createElement(type);
//   heading.innerHTML = text;
//   return heading;
// }

// function createInput(type, placeholder) {
//   const input = document.createElement('input');
//   input.type = type;
//   input.placeholder = placeholder;
//   return input;
// }

// function createButton(text, onclick) {
//   const button = document.createElement('button');
//   button.innerHTML = text;
//   button.onclick = onclick;
//   return button;
// }

export default () => {
  const container = document.createElement('div');

  const templateLogin = `
  <div class="login-wrap">
  <img src="img/logo.png" id="logo" alt="Logo da ExploraAí">
  <h2>Entrar</h2>

  <form>
  <div>
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
