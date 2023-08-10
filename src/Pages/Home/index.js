import logo_mundo_azul from "../Imagens/Mundo_azul_logo.png"
export default () => {
    const containerHome = document.createElement('div');
    const templateHome = `

  <header>
     <nav>
       <ul>
         <li>
          <a href= "/#login">Entrar</a>
         </li>
         <li>
           <a href = "/#cadastro">Cadastre-se</a>
         </li>
        </ul>
     </nav>
   </header>

   
   <main>
   
     <div class = container-Home>
     
     <img src= ${logo_mundo_azul} alt="Logo da página">
     

     <p>
      O Mundo Azul, é uma rede social destinada a mães, pais e cuidadores 
      de pessoas com TEA (Transtorno do Espectro Autista). 
      Aqui você encontrará  acolhimento, empatia e dicas importantes para 
      entender melhor sobre este mundo. 
     </p>
     
     </div>     
   </main>
   
   <footer>
   <p> Desenvolvido por Carolina Menezes e Lilian Damadi</p>
   </footer>

     
  `;
  containerHome.innerHTML = templateHome;
  return containerHome;
}

