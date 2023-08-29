export default () => {
    const container = document.createElement('div');
  
    const template = `
    <h2>Seja bem vinda!</h2>
    <div class="post">
      <input id="campo-de-mensagem" placeholder="Que tal compartilhar experiências sobre suas viagens?"/>
      <button id="postar-botao" type="submit">postar</button>
    </div> 
    `;
    container.innerHTML = template
  
    const button = container.querySelector('#postar-botao');
    button.addEventListener('click', (event) => {
      event.preventDefault()
      const mensagem = container.querySelector('#campo-de-mensagem').value
      console.log('Testando botao', mensagem)
    })
    return container;
  }

  // aqui serão criado os templates