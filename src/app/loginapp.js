export default () => {
  const container = document.createElement('div');

  const template = `
     
 

  <h1> BEM VINDO A </h1>
  
 <img class="logo2" src="./images/logo2.png">




 <body>


   <fieldset>

    <legend> Acesse sua conta com </legend>

    <img class="logo4" src="./images/logo4.png">


     <ul class="FormularioLoginEmail">
      <label for="email" >E-Mail</label><p>
      <input type="email" id="formularioCadastroNome" placeholder="Digite seu e-mail" >
     </ul>


     <ul class="FormularioLoginSenha">
      <label for="senha" >Senha</label><p>
      <input type="senha" id="senhaUsuario" placeholder="digite sua senha">
     </ul>

    <button type="button" onclick="entrarLoginUsuario()">Entrar</button>
    <button type="button" onclick="registrarNovoUsuario()">registrar</button><p>

    <button type="button" onclick="redefinirSenha()">Esqueceu a Senha? Clique aqui!</button><p>

    <a href="cadastro.html" target="_blank"> Esqueceu a Senha? Clique aqui!</a>

    <!--<button id="reset" class="btn-option-reset"  >Limpar</button><p>-->


  </fieldset>`;

  container.innerHTML = template;

  return container;
};
