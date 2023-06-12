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
              <button class="btnCadastrar2" id="btnCadastrar2">CADASTRAR</button>  
                </p>
  </div>`;
  
  container.innerHTML = template;
  return container;
 
};
