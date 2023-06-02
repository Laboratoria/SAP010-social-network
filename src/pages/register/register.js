export function mostrarFormularioRegistro() {
  const body = document.getElementsByTagName('body')[0];
  body.innerHTML = '';

  const formularioRegistro = createDiv('formularioRegistro');

  const registroTitulo = createHeading('h2', 'Cadastre-se');
  formularioRegistro.appendChild(registroTitulo);

  const nomeInput = createInput('text', 'Nome');
  formularioRegistro.appendChild(nomeInput);

  const sobrenomeInput = createInput('text', 'Sobrenome');
  formularioRegistro.appendChild(sobrenomeInput);

  const senhaInput = createInput('password', 'Senha', 'br');
  formularioRegistro.appendChild(senhaInput);

  const cadastrar = createButton('CADASTRAR');
  formularioRegistro.appendChild(cadastrar);

  const textoOu = createElement('p', 'ou', 'br');
  formularioRegistro.appendChild(textoOu);

  const entrarCom = createElement('p', 'ENTRAR COM');
  formularioRegistro.appendChild(entrarCom);

  const googleBtn = createButton('Google');
  formularioRegistro.appendChild(googleBtn);

  body.appendChild(formularioRegistro);
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

function createElement(type, text) {
  const element = document.createElement(type);
  element.innerHTML = text;
  return element;
}
