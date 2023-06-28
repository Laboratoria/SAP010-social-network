//colocar import do configfirebase.js e separar 
//import { } from ".authUser.js";

export default () => {

  const cadastro = document.createElement('div');
  const templateCadastro = `<form action="">
  <fieldset>Cadastre-se
      <div>
          <label for="">Nome do usuário</label>
          <input type="text" class="usuário" id="usuário">
      </div>
      <div>
          <label for="email">Email</label>
          <input type="email" class="email" id="email">
      </div>
      <div>
          <label for="">Senha</label>
          <input type="number" class="senha" id="senha">
      </div>
    <a href="/#concluirCadastro">Concluir cadastro</a>
    <a href="/#voltar">Voltar</a>
    <a href="/#loginGoogle">Login com Google</a>
  </fieldset>
</form>`;
  
  cadastro.innerHTML = templateCadastro;
  
  return cadastro;
  }