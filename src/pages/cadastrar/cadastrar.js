export default () => {
  const container = document.createElement("div");

  const template=`
  <div class="container" id="container-template">
    <header>
      <img src= "imagens/logo mania de cupom.png" alt="logo"></img>
    </header>
    <form class="form" id="form">
            <img class="etiqueta" src="imagens/etiqueta de desconto preta.png" alt="etiqueta" />
                <h2>A REDE SOCIAL PARA QUEM GOSTA DE ECONOMIZAR!</h2>
                <p class="nome">
                <input type="text" class="inserir_nome" id="inserirnome" placeholder="Digite seu Nome e Sobrenome"/>
                </p>
                <p class="email">
                <input type="text" class="inserir_email" id="inseriremail" placeholder="Digite seu email"/>
                </p>
                <p class="senha">
                <input type="text" class="digite_senha" id="digitesenha" placeholder="Digite uma senha"/>
                </p>
                <p class="confirmasenha">
                <input type="text" class="confirma_senha" id="confirmasenha" placeholder="Confirme sua senha"/>
                </p> 
            </form>
            <p class="form">
              <button class="btnCadastrar" id="btnCadastrar">CADASTRAR!</button>  
                </p>
  </div>`;
  
  container.innerHTML = template;
  return container;
 
};
