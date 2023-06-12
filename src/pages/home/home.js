export default () => {
  const container = document.createElement("div");

  const template = `
    <div class="container" id="container-template">
       <header>
         <img class="logo" src="imagens/logo mania de cupom.png" alt="logo" />
       </header>
            <form class="form" id="form">
                <img class="etiqueta" src="imagens/etiqueta de desconto preta.png" alt="etiqueta" />
                <h2>A REDE SOCIAL PARA QUEM <br> GOSTA DE ECONOMIZAR!</h2>
                <p class="email">
                <input type="text" class="inserir_email" id="inseriremail" placeholder="Digite seu e-mail"/>
                </p>
                <p class="senha">
                <input type="text" class="digite_senha" id="digitesenha" placeholder="Digite sua senha"/>
                </p> 
            </form>
            <p class="form">
              <a href="/#recuperar" type="text" class="btnRecuperar" id="btnRecuperar">Esqueci minha senha</a>
            </p>
            <p class="form">
              <button class="btnLogar" id="btnLogar">LOGAR</button>
            </p>
            <p class="form">
              <button class="logarGoogle" id="btnGoogle">Entrar com Google</button>
            <p class="form">
              <a href="/#cadastrar" type="button" class="btnCadastrar" id="btnCadastrar">CADASTRE-SE</a>
            </p>
    </div>
    
    `;

  container.innerHTML = template;
  return container;
};
