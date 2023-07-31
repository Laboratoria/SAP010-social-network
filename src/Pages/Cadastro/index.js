import logo_mundo_azul from "../Imagens/Mundo_azul_logo.png"
export function cadastro() {
  const containerCadastro = document.createElement("div");

  const templateCadastro = `   
    
    <header></header>

   <main>

     <div class = container-cadastro>

     <img src= ${logo_mundo_azul} alt="Logo da página"> 

     <p>
      O Mundo Azul, é uma rede social destinada a mães, pais e cuidadores 
      de pessoas com TEA (Transtorno do Espectro Autista). 
      Aqui você encontrará  acolhimento, empatia e dicas importantes para 
      entender melhor sobre este mundo. 
     </p>
     
      <input type = "name"  id = "name" name= "name" placeholder = "Nome completo" requered>
      <label for="name" >Nome completo</label>

      <input type = "email"  id = "email" name="email" placeholder = "E-mail" requered>
      <label for="email" >E-mail</label>

      <input type = "password"  id = "senha" name="senha" placeholder = "Senha" requered>
      <label for="senha" >Senha</label>
      
      <input type = "password"  id = "confirme a senha" name="confirme a senha" placeholder = 'Senha' requered>
      <label for="confirme a senha">Confirme a Senha</label>

      <a href = "/#"><button type="submit">Cadastrar</button></a>

     </div>

   </main>

   <footer>
     <p> Desenvolvido por Carolina Menezes e Lilian Damadi</p>
   </footer>
`;
  containerCadastro.innerHTML = templateCadastro;
  return containerCadastro;
}
