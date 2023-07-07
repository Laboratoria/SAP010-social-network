export default () => {
const container = document.createElement('div');
container.id = "csscadastro";

const template = `<picture>
<img src="imagens/menina.png" alt="menina fazendo movimento de arte marcial" id="menina-cadastro">
</picture>`;

container.innerHTML = template;

return container;
}