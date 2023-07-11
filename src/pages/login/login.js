export default () => {
  const container = document.createElement('div');
  container.id = 'csslogin';

  const template = `
  <picture id="picture-login">
  <nav><a href=""><img src="imagens/icon-voltar.png"></a></nav>
  <img src="imagens/menina.png" alt="menina fazendo movimento de arte marcial" id="menina-login">
  </picture>
  <form id="formulario-login">
  <header><h1>ENTRAR</h1>
<picture>
<img src="imagens/fightback-logo.png" alt="logo do app">
</picture>
</header>
<input type="email" id="input-email" name="email" placeholder="Email">
<input type="password" id="input-senha" name="senha" placeholder="Senha">
<button id="btn-cinza-login">Entrar</button>
<p id="paragrafo-login">Ainda não tem uma conta?&nbsp;<a href="/#cadastro">Cadastre-se</a></p>
  </form>`;

  container.innerHTML = template;

  return container;
};
