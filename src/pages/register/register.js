import { errorsFirebase, validateRegister } from '../../validations.js';
import { createUserWithEmail } from '../../firebase/auth.js';


export function mostrarFormularioRegistro() {
  const body = document.getElementsByTagName('body')[0];
  body.innerHTML = '';

  const formularioRegistro = document.createElement('div');
  formularioRegistro.classList.add('contenedor-registro');
  const plantillaFormulario = `
  <section class="form-envelope">
  <p class="titulo">Cadastre-se</p>
  </section>
  <section class="registro-caja">
  <form class="registro-form">
    <div class="inputs-div">
      <input type="text" class="inputs-registro" id="nombre-usuario" placeholder="Nome completo">
      <input type="email" class="inputs-registro" id="registro-email" placeholder="nome@email.com">
      <input type="password" class="inputs-registro" id="registro-senha" placeholder="senha">
      </div>
    
      <div>
      <button type="button" id="register-btn" href="#timeline">Cadastrar</button>
    </div>
   
     <p class="esquecer-senha">Esqueceu a senha?</p>

     <p class="text-ou">OU</p>

    <div>
      <button type="button" id="">Entrar com: <a id=" href="">Google</a></button>
    </div>
  </form>
</section>
`;

formularioRegistro.innerHTML = plantillaFormulario;
body.appendChild(formularioRegistro);

}