import './cafe-com-rum.css';

export default () => {
  const container = document.createElement('div');

  const template = `
    <div class="container-rum">
        <h1 class="informativo">Página em construção!</h1>
        <a href="#feed" class="voltar">Voltar</a>
        </div>
    `;

  container.innerHTML = template;
  return container;
};
