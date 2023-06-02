// import { myFunction } from '../lib/index.js';
// // Este es el punto de entrada de tu aplicacion - só manipulação de DOM - elements HTML


// myFunction();


window.onload = function() {
  const body = document.getElementsByTagName("body")[0];

  const titulo = document.createElement("h1");
  titulo.innerHTML = "ExploraAí!";
  body.appendChild(titulo);

  const loginBtn = createButton("ENTRAR", mostrarFormularioLogin);
  body.appendChild(loginBtn);

  const registerBtn = createButton("CRIAR CONTA", mostrarFormularioRegistro);
  body.appendChild(registerBtn);
}

function mostrarFormularioLogin() {
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = "";

  const formularioLogin = createDiv("formularioLogin");

  const loginTitulo = createHeading("h2", "Login");
  formularioLogin.appendChild(loginTitulo);

  const emailInput = createInput("email", "E-MAIL");
  formularioLogin.appendChild(emailInput);

  const senhaInput = createInput("password", "SENHA");
  formularioLogin.appendChild(senhaInput);

  const entrarBtn = createButton("ENTRAR");
  formularioLogin.appendChild(entrarBtn);

  const criarNovaConta = createButton("CRIAR NOVA CONTA");
  formularioLogin.appendChild(criarNovaConta);

  body.appendChild(formularioLogin);
}

function mostrarFormularioRegistro() {
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = "";

  const formularioRegistro = createDiv("formularioRegistro");

  const registroTitulo = createHeading("h2", "Cadastre-se");
  formularioRegistro.appendChild(registroTitulo);

  const nomeInput = createInput("text", "Nome");
  formularioRegistro.appendChild(nomeInput);

  const sobrenomeInput = createInput("text", "Sobrenome");
  formularioRegistro.appendChild(sobrenomeInput);

  const senhaInput = createInput("password", "Senha", "br");
  formularioRegistro.appendChild(senhaInput);

  const cadastrar = createButton("CADASTRAR");
  formularioRegistro.appendChild(cadastrar);

  const textoOu = createElement("p", "ou", "br");
  formularioRegistro.appendChild(textoOu);

  const entrarCom = createElement("p", "ENTRAR COM");
  formularioRegistro.appendChild(entrarCom);

  const googleBtn = createButton("Google");
  formularioRegistro.appendChild(googleBtn);

  body.appendChild(formularioRegistro);
}

function createButton(text, onclick) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.onclick = onclick;
  return button;
}

function createDiv(id) {
  const div = document.createElement("div");
  div.id = id;
  return div;
}

function createHeading(type, text) {
  const heading = document.createElement(type);
  heading.innerHTML = text;
  return heading;
}

function createInput(type, placeholder) {
  const input = document.createElement("input");
  input.type = type;
  input.placeholder = placeholder;
  return input;
}

function createElement(type, text) {
  const element = document.createElement(type);
  element.innerHTML = text;
  return element;

}
