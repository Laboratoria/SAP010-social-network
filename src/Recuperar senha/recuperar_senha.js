export function recuperarSenha () {
    const containerRecuperação = document.createElement("div"); 
    
    const templateRecuperação = `   
    
    <header></header>

   <main>
     <div class = "container-recuperação">

      <p>Informe o e-mail ultilizado no cadastrado e enviaremos em instantes um e-mail para
       a recuperação da sua senha.</p>

      <input type = "email"  id = "email-recuperar" name="email" placeholder = "E-mail" requered>
      <label for="email" >E-mail</label>

      <button type="submit">Enviar</button>

     </div>

   </main>
`;
containerRecuperação.innerHTML= templateRecuperação;
return containerRecuperação;
}