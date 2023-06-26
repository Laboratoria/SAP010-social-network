export default () => {

  const cadastro = document.createElement('div');
  const templateCadastro = `<form action="">
  <fieldset>Cadastre-se
      <div>
          <input type="text" class="usuário" id="usuário">
          <label for="">Nome do usuário</label>
      </div>
      <div>
          <input type="email" class="email" id="email">
          <label for="email">Email</label>
      </div>
      <div>
          <input type="number" class="senha" id="senha">
          <label for="">Senha</label>
      </div>
    <a href="/#concluirCadastro">Concluir cadastro</a>
    <a href="/#voltar">Voltar</a>
    <a href="/#loginGoogle">Login com Google</a>
  </fieldset>
</form>`;
  
  cadastro.innerHTML = templateCadastro;
  
  return cadastro;
  }