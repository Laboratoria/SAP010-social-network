export function login () {
    const containerLogin = document.createElement("div"); 
    
    const templateLogin = `   
    
    <header></header>

   <main>

     <div class = container-login>

     <img src= "logo_mundo_azul.jpg" alt = "Logo da página"> 

     <p>
      O Mundo Azul, é uma rede social destinada a mães, pais e cuidadores 
      de pessoas com TEA (Transtorno do Espectro Autista). 
      Aqui você encontrará  acolhimento, empatia e dicas importantes para 
      entender melhor sobre este mundo. 
     </p>
      
      <input type = "login"  id = "login" name="login" placeholder = "Login" requered>
      <label for="login" >Login</label>

      <input type = "password"  id = "senha-login" name="senha" placeholder = "Senha" requered>
      <label for="senha" >Senha</label>

      <a href= "/#recuperar" id="recuperar-senha">Esqueci a senha</a>
          
      <a href = "/#feed"><button type="submit">Entrar</button></a>
      <p>Não está cadastrado? <a href= "/#cadastro-clique-aqui" id="clique-aqui">Clique aqui!</a></p>

     </div>

   </main>

   <footer>
   <p> Desenvolvido por Carolina Menezes e Lilian Damadi</p>
   </footer>
`;
containerLogin.innerHTML= templateLogin;
return containerLogin;
}