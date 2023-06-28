export const home = () => {
  const container = document.createElement('div');

  const templateHome = `
      <section class='homepage-form'>
      <img src='./img/logo.png' class='logo-repet' alt='Logo da rede social re.Pet'>
        <p> Já possui cadastro?</p>
        <a class='homepage-button' href='/#login'>Entrar</a>
        <p> Não possui cadastro?</p>
        <a class='homepage-button' href='/#cadastro'>Cadastrar</a>
      </section>
      `;

  container.innerHTML = templateHome;

  return container;
};
