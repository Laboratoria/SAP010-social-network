// aqui serão criado os templates

export default () => {
    const container = document.createElement('div');
  
    const template = `
    <p>
      Uma rede social segura para mulheres que curte viajar 
      sozinha e gosta compartilhar dicas,  experiências 
      sobre as viagens e também  fazer novas amizades.
    </p>
    <div class="formulario-login">
      <h2>Login</h2>
      <p>E-mail:</p>
      <input type="email"/>
      <p>Senha:</p>
      <input type="password"/>
      <button type="button">ENTRAR</button>
    </div>
    <img src="./img/Mulheres viajando.png">
    `;
    container.innerHTML = template
  
    return container;
  }