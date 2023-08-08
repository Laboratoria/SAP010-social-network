import logo_mundo_azul from "../Imagens/Mundo_azul_logo.png"
export function cadastro() {
  const containerCadastro = document.createElement("div");

  const templateCadastro = `   
    
    <header></header>

   <main>

     <div class = container-cadastro>
     <section class="logotipo_cad">
     
     <img src= ${logo_mundo_azul} alt="Logo da página"> 

      </section>
      
      <section class="campos_de_preenchimento">
      <h2 class="subtitulo">Cadastre-se aqui!</h2>
      <label for="name" >Nome completo</label>
      <input type = "name"  class="name" id = "name" name= "name" placeholder = "" requered>
      
      <label for="email" >E-mail</label>
      <input type = "email" class="email" id = "email" name="email" placeholder = "" requered>
      
      <label for="senha" >Senha</label>
      <input type = "password" class="senha" id = "senha" name="senha" placeholder = "" requered>
      
      <label for="confirme a senha">Confirme a Senha</label>
      <input type = "password"  class="senha" id = "confirme_a_senha" name="confirme a senha" placeholder = '' requered>
      
      <a href = "/#"><button type="submit" id="button">Cadastrar</button></a>
      </section>
     </div>
   </main>

   <footer>
     <p class="criadoras"> Desenvolvido por Carolina Menezes e Lilian Damadi</p>
   </footer>
`;
  containerCadastro.innerHTML = templateCadastro;

  const cadastroPage = document.createElement("link");
  cadastroPage.rel = "stylesheet";
  cadastroPage.href = "pages/Cadastro/cadastro.css";
  document.head.appendChild(cadastroPage);


 function criarCadastro () {

    const nome = document.getElementById("name");
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirme_a_senha");
    const botaoCriarUsuario = document.getElementById("button");

 }




  return containerCadastro;
}
