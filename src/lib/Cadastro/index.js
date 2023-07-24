export default () => {
    const containerCadastro = document.createElement("div"); 
    
    const templateCadastro = `   
    
    <header>
     <p>
      O Mundo Azul, é uma rede social destinada a mães, pais e cuidadores 
      de pessoas com TEA (Transtorno do Espectro Autista). 
      Aqui você encontrará  acolhimento, empatia e dicas importantes para 
      entender melhor sobre este mundo. 
     </p>
   </header>

   <main>
     <div class = container-cadastro>
      <input type = "name"  id = "name" name= "name" placeholder = "Nome completo" requered>
      <label for="name" >Nome completo</label>

      <input type = "email"  id = "email" name="email" placeholder = "E-mail" requered>
      <label for="email" >E-mail</label>

      <input type = "password"  id = "senha" name="senha" placeholder = "Senha" requered>
      <label for="senha" >Senha</label>
      
      <input type = "password"  id = "confirme a senha" name="confirme a senha" placeholder = 'Senha' requered>
      <label for="confirme a senha">Confirme a Senha</label>

      <button type="submit">Cadastrar</button>

     </div>

   </main>
`;
containerCadastro.innerHTML= templateCadastro;
return containerCadastro;
}
