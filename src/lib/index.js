// aqui exportaras las funciones que necesites

export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};

export function start() {
  const startElement = document.createElement('section');
  startElement.setAttribute('id', 'starting');
  startElement.setAttribute('class', 'starting');
  startElement.innerHTML = '<h2>Welcome</h2><img src="./images/bem-vindes.gif">';
  document.body.appendChild(startElement);
}

export function stop() {
}

export function newElement(element) {
  const makeElement = document.createElement('section');
  // cria uma section
  makeElement.innerHTML = element;
  // inclui o elemento recebido na estrutura do HTML
  document.body.appendChild(makeElement);
  // inclui o elemento no HTML
}

export function removeElement(element) {
  document.body.removeChild();
  // é possível criar um objeto bom tags HTML
  // para que eu selecione o valor do id da tag criada pra conseguir excluir?
}
