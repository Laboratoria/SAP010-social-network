import logo_mundo_azul from "../Imagens/Mundo_azul_logo.png"
export function login () {
    const containerLogin = document.createElement("div"); 
    
    const templateLogin = `   
    
    <header></header>

   <main>

     <div class = container-login>

     <img src= ${logo_mundo_azul} alt="Logo da página"> 

     <p class="resumo">
      O Mundo Azul, é uma rede social destinada a mães, pais e cuidadores 
      de pessoas com TEA (Transtorno do Espectro Autista). 
      Aqui você encontrará  acolhimento, empatia e dicas importantes para 
      entender melhor sobre este mundo. 
     </p>
      
     <section>
      <label for="login" >Login</label>
      <input type = "login" class="login" id = "login" name="login" placeholder = "" requered>
      
      <label for="senha" >Senha</label>
      <input type = "password"  class="login" id = "senha-login" name="senha" placeholder = "" requered>
      
      <a href= "/#recuperar" id="recuperar-senha" class="recuperar-senha">Esqueci a senha</a>
          
      <a href = "/#feed"><button type="submit" class>Entrar</button></a>
      <p class="cadastro">Não está cadastrado? <a href= "/#cadastro-clique-aqui" class="clique-aqui" id="clique-aqui">Clique aqui!</a></p>
     </section>
     </div>

   </main>

   <footer>
   <p class="desenvolvedoras"> Desenvolvido por Carolina Menezes e Lilian Damadi</p>
   </footer>
`;
containerLogin.innerHTML= templateLogin;
const loginPage= document.createElement("link"); loginPage.rel = "stylesheet"; 
loginPage.href = "pages/login/login.css";
document.head.appendChild(loginPage);

return containerLogin;
}