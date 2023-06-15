export default () => {

  const container = document.createElement('div');

  const template = `
     
    <div>
     <h1> BEM VINDO A </h1>
     <img class="logo2" src="./images/logo2.png">
    </div>
 
 
    <fieldset>

      <legend> *CAMPOS OBRIGATÓRIOS  </legend>


      <ul class="FormularioCadastroNome">
        <label for="nome" >Nome Completo*</label>
        <input type="nome" id="formularioCadastroNome" placeholder="Digite seu Nome" ></input>
      </ul>


      <ul class="FormularioCadastroEmail">
        <label for="email" >E-Mail</label>
        <input type="email" id="formularioCadastroNome" placeholder="Digite seu melhor e-mail" ></input>
      </ul>


        <ul class="FormularioLogin">
        <label for="senha" >Senha</label>
        <input type="senha" id="senhaUsuario" placeholder="digite sua senha"></input>
        </ul>

       <button type="button" onclick="entrarLoginUsuario()">Entrar</button>  
       
       <button type="button" onclick="registrarNovoUsuario()">registrar</button><p>


        <button id="reset" class="btn-option-reset"  >Limpar</button><p>


    </fieldset> `;

  container.innerHTML = template;

  return container;
}