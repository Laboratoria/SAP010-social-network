import {signUpUser} from "../../lib/index.js"

export default () => {
    const container = document.createElement('div');

    const template =`
    <div class="container" id="container-template"
       <header>
         <img class="logo" src="logo mania de cupom.png" alt="logo" />
       </header>
      <div class="formulario">
            <form class="form" id="form">
            <img class="etiqueta" src="etiqueta de desconto preta.png" alt="etiqueta" />
                <h2>A REDE SOCIAL PARA QUEM GOSTA DE ECONOMIZAR!</h2>
                <p class="email">
                <input type="text" class="inserir_email" id="inseriremail" placeholder="Digite seu email"/>
                </p>
                <p class="senha">
                <input type="text" class="digite_senha" id="digitesenha" placeholder="Digite sua senha"/>
                </p> 
            </form>
           
            <p class="form">
              <button class="logarGoogle" id="btnGoogle">Entrar com Google</button>
            <p class="form">
              <button class="btnCadastrar" id="btnCadastrar">CADASTRAR!</button>  
            </p>
       </div>
    </div>
    
    `;

container.innerHTML = template;

const register = container.querySelector(".btnCadastrar")
 register.addEventListener('click', () => {
  const email = container.querySelector(".inserir_email")
  const password = container.querySelector(".digite_senha")

  signUpUser(email.value, password.value).then(() => {
  
      alert('Usuário cadastrado com sucesso!')
      window.location.hash = '#home';
              
  })
  .catch((error) => {
      alert('Erro ao cadastrar, por favor verifique os campos preenchidos.')
      
  })
 })



return container;

};