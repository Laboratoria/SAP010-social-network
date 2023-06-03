import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';
import './register.css';

export function mostrarFormularioRegistro() {
  const body = document.getElementsByTagName('body')[0];
  body.innerHTML = '';

  const formularioRegistro = document.createElement('div');
  formularioRegistro.classList.add('contenedor-registro');
  const plantillaFormulario = `
  <section class="form-envelope">
  <p class="titulo">Cadastrar-se</p>
  </section>
  <section class="registro-caixa">
  <form class="registro-form">
    <div class="inputs-div">
      <input type="text" class="inputs-registro" id="nome-usuario" placeholder="NOME">
      <input type="text" class="inputs-registro" id="sobrenome-usuario" placeholder="SOBRENOME"><br>
      <input type="password" class="inputs-registro" id="registro-senha" placeholder="CRIAR SENHA">
      </div>
    
      <div>
      <button type="button" class="registro-btn" href="#timeline">CADASTRAR</button>
    </div> 
    </form>
</section>
`;

formularioRegistro.innerHTML = plantillaFormulario;
//return formularioRegistro;
body.appendChild(formularioRegistro);

}