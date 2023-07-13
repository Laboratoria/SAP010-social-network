export default () => {
  const stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href','pages/Perfil/perfil.css');
  document.head.appendChild(stylesheet);

  const perfilContainer = document.createElement('div');
  const templatePerfil = `
  <header>
      <picture><img class="logo" src="./img/icon_logo_contraplano.png"></picture>
      <div>
        <img></img>
        <h3> Perfil </h3>
        <h2> Nome do Usuário </h2>
        <nav> 
          <ul>
            <li>
              <a href="">Comente um filme</a>
              <a href="">Feed</a>
            </li>
          </ul>
        </nav>

  </header>
  <div>
      <img></img>

  </div>
  <section class = inicioFeed>
      <h1> Nome do Usuário </h1>
      <h2> ”É curioso como as cores do mundo real parecem muito mais reais quando vistas no cinema.” Laranja Mêcanica, 1971 </h2>
      <h3> Suas postagens publicadas recentemente </h3>
  </section>
  <section class = posts>

  </section>
  <footer>
      
  </footer>`;

  perfilContainer.innerHTML = templatePerfil;

  return perfilContainer;
};