export default () => {
    const container = document.createElement('div');
  
    const template = `
    <h2>Seja bem vinda!</h2>
    <div placeholder="Que tal compartilhar experiências sobre suas viagens?">
    </div> 
    `;
    container.innerHTML = template
  
    return container;
  }

  // aqui serão criado os templates