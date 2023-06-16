

export default () => {

  const container = document.createElement('div');

  const templateRegister = `



     
  <h1> BEM VINDO A </h1>
  
  <img class="logo2" src="./images/logo2.png">
 
 
 
 
  <body>
     
    <fieldset>

    <legend> Cadastre-se </legend>

    <img class="logo4" src="./images/logo4.png">

   <legend> *CAMPOS OBRIGATÓRIOS  </legend>


   <ul class="FormularioCadastroNome">
    <label for="name" >Nome Completo*</label>
    <input type="name" id="nameRegister" placeholder="Digite seu Nome" >
   </ul>


   <ul class="FormularioCadastroEmail">
    <label for="email" >E-Mail</label>
    <input type="email" id="emailRegister" placeholder="Digite seu melhor e-mail" >
   </ul>


   <ul class="FormularioLogin">
    <label for="senha" >Senha</label>
    <input type="senha" id="senhaUsuario" placeholder="digite sua senha"   >
   </ul>

  
   <button type="button2" onclick="registrarNovoUsuario()" id='btn-register' >registrar</button><p>


  </fieldset> `

  container.innerHTML = templateRegister;

  //const nameInput = container.querySelector('#nameRegister');
  //const emailInput = container.querySelector('#emailRegister');
  //const senhaInput = container.querySelector('#senhaUsuario');
  //const registerButton = container.querySelector('#btn-register');



  return container;
}