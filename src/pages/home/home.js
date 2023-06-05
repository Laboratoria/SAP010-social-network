export default () => {
    const container = document.createElement('div');

    const template =`
    <img id="etiqueta" src="etiqueta de desconto preta.png" alt="etiqueta" />
    <h2>A REDE SOCIAL PARA QUEM GOSTA DE ECONOMIZAR"</h2>
    <div class="login">
    <form class="email">
    <input type="text" class="inserir_email" id="inseriremail"/>
    <input type="text" class="digite_senha" id="digitesenha"/>

    <div>
    <button id="buttonlogar" type="submit">LOGAR</button>
    </div>
    </div>
    </form>`;

container.innerHTML = template;
return container;

}