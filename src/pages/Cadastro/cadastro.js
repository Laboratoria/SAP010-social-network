//colocar import do configfirebase.js e separar 
//import { } from "../../lib/authUser.js";

export default () => {

  const cadastro = document.createElement('div');
  const templateCadastro = `<form action="">
  <fieldset>Cadastre-se
      <div>
          <label for="">Nome completo</label>
          <input type="text" class="nome-completo" id="nome-completo">
</div>
      <div>
          <label for="">Nome do usuário</label>
          <input type="text" class="usuario" id="usuario">
      </div>
      <div>
          <label for="email">Email</label>
          <input type="email" class="email" id="email">
      </div>
      <div>
          <label for="">Senha</label>
          <input type="number" class="senha" id="senha">
      </div>
    <button class="btn" id="btn-cad-voltar">Voltar</button>
    <button class="btn" id="btn-cad-concluir">Concluir cadastro</button>
    <button class="btn" id="btn-cad-login-google">Login com Google</button>
  </fieldset>
</form>`;
  
  cadastro.innerHTML = templateCadastro;
  
  return cadastro;
  }