import {signUpUser} from "../../lib/index.js"

export default () => {
  const container = document.createElement("div");

  const template=`
  <div class="container" id="container-template">
    <header>
      <img class="logo" src= "imagens/logo mania de cupom.png" alt="logo"></img>
    </header>
    <form class="form" id="form">
            <img class="etiqueta" src="imagens/etiqueta de desconto preta.png" alt="etiqueta" />
                <h2>A REDE SOCIAL PARA QUEM <br> GOSTA DE ECONOMIZAR!</h2>
                <p class="nome">
                <input type="text" class="inserir_nome" id="inserirnome" placeholder="Digite seu Nome e Sobrenome"/>
                </p>
                <p class="email">
                <input type="text" class="inserir_email2" id="inseriremail2" placeholder="Digite seu e-mail"/>
                </p>
                <p class="senha">
                <input type="text" class="digite_senha2" id="digitesenha2" placeholder="Digite uma senha"/>
                </p>
                <p class="confirmasenha">
                <input type="text" class="confirma_senha" id="confirmasenha" placeholder="Confirme sua senha"/>
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

