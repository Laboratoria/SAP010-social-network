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
<form id="formulario-cadastro" autocomplete="off">
<input type="text" id="input-name" name="name" placeholder="Nome">
<input type="email" id="input-email" name="email" placeholder="Email">
<input type="password" id="input-senha" name="senha" placeholder="Senha">
<button id="btn-vermelho">Cadastrar</button>
</form>
<p>Já tem uma conta?&nbsp;<a href="/#login">Entrar</a></p>`;

container.innerHTML = template;

return container;
}