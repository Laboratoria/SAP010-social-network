import './feed.css';

export default () => {
  const containerFeed = document.createElement('div');
  containerFeed.classList.add('container-feed');

  const templateFeed = `
  <p>Tela de feed</p>
  
  `;

  containerFeed.innerHTML = templateFeed;

  return containerFeed;
};
