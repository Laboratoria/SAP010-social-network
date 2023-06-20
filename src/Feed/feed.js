export const feedUser = () => {
  const container = document.createElement('div');

  const template = ` 
  <h1>Food Review</h1>
  `;

  container.innerHTML = template;
  return container;
};