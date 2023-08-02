// aqui serão criado os templates

export default () => {
    const container = document.createElement('div');
  
    const template = `
    <h2>Login</h2>
    <p>E-mail:</p>
    <input type="email"/>
    <p>Senha:</p>
    <input type="password"/>
    <img src="./img/Mulheres viajando.png">
    `;
    container.innerHTML = template
  
    return container;
  }