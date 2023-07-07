export default () => {
const container = document.createElement('div');
container.id = "csscadastro";

const template = `<picture id="picture-cadastro">
<img src="imagens/menina.png" alt="menina fazendo movimento de arte marcial" id="menina-cadastro">
</picture>
<header><h1>CADASTRE-SE</h1>
<picture>
<img src="imagens/fightback-logo.png" alt="logo do app">
</picture>
</header>
<form id="formulario-cadastro">

</form>`;

container.innerHTML = template;

return container;
}