// Este es el punto de entrada de tu aplicacion

import { myFunction } from './index.js';
import { cadastro } from './Cadastro/index.js';
import { login } from './Login/login.js';
import { recuperarSenha } from './Recuperar senha/recuperar_senha.js';

const container = document.getElementById("container");

container.appendChild(cadastro());
container.appendChild(login());
container.appendChild(recuperarSenha());

myFunction();


