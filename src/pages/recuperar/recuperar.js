export default () => {
    const container = document.createElement('div');

    const template =`
    <div class="container" id="container-template"
       <header>
         <img class="logo" src="imagens/logo mania de cupom.png" alt="logo" />
       </header>
      <div class="formulario">
            <form class="form" id="form">
            <img class="etiqueta" src="imagens/etiqueta de desconto preta.png" alt="etiqueta" />
                <h2>A REDE SOCIAL PARA QUEM GOSTA DE ECONOMIZAR!</h2>
                <p class="email">
                <input type="text" class="inserir_email" id="inseriremail" placeholder="Digite seu email"/>
                </p>
                
            </form>
            <p>
              <button class="btnEnviar" id="btnEnviar">ENVIAR</button>  
            </p>
            <p class="form">
              <a href="/#home" type="button" class="btnVoltar" id="btnVoltar">Voltar</a>
            </p>
       </div>
    </div>
    
    `;

container.innerHTML = template;
return container;

}