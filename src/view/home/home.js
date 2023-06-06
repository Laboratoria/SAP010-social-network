
export const home = () => {
    const container = document.createElement("div");
  
    const templateHome = `
      
    <img src="./img/logo.png" class="logo-repet" alt="Logo da rede social re.Pet">
  
      <section class="loginpage-form">
        <p> Já possui cadastro?</p>
        <a class="loginpage-button" href="/#login">Entrar</a>
        <p> Não possui cadastro?</p>
        <a class="loginpage-button" href="/#cadastro">Cadastrar</a>
      </section>
      `;
  
    container.innerHTML = templateHome;
  
    return container;
  };