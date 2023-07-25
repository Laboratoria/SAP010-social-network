export function login () {
    const containerLogin = document.createElement("div"); 
    
    const templateLogin = `   
    
    <header>
     <p>
      O Mundo Azul, é uma rede social destinada a mães, pais e cuidadores 
      de pessoas com TEA (Transtorno do Espectro Autista). 
      Aqui você encontrará  acolhimento, empatia e dicas importantes para 
      entender melhor sobre este mundo. 
     </p>
   </header>

   <main>
     <div class = container-login>
      
      <input type = "login"  id = "login" name="login" placeholder = "Login" requered>
      <label for="login" >Login</label>

      <input type = "password"  id = "senha-login" name="senha" placeholder = "Senha" requered>
      <label for="senha" >Senha</label>

      <a href= "#" id="recuperar-senha">Esqueci a senha</a>
          
      <button type="submit">Entrar</button>
      <p>Não está cadastrado? <a href= "#1" id="clique-aqui">Clique aqui!</a></p>

     </div>

   </main>
`;
containerLogin.innerHTML= templateLogin;
return containerLogin;
}