export function mostrarFormularioLogin() {
  const body = document.getElementsByTagName('body')[0];
  body.innerHTML = '';

  const formularioLogin = createDiv('formularioLogin');

  const loginTitulo = createHeading('h2', 'Login');
  formularioLogin.appendChild(loginTitulo);

  const emailInput = createInput('email', 'E-MAIL');
  formularioLogin.appendChild(emailInput);

  const senhaInput = createInput('password', 'SENHA');
  formularioLogin.appendChild(senhaInput);

  const entrarBtn = createButton('ENTRAR');
  formularioLogin.appendChild(entrarBtn);

  const criarNovaConta = createButton('CRIAR NOVA CONTA');
  formularioLogin.appendChild(criarNovaConta);

  body.appendChild(formularioLogin);
}

function createDiv(id) {
  const div = document.createElement('div');
  div.id = id;
  return div;
}

function createHeading(type, text) {
  const heading = document.createElement(type);
  heading.innerHTML = text;
  return heading;
}

function createInput(type, placeholder) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  return input;
}

function createButton(text, onclick) {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.onclick = onclick;
  return button;
}
