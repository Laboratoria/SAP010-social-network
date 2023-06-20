import './feed.css';
import { getUserName, getAppAuth } from '../../firebase/auth.js';
>>>>>>> 3dc2565894e4ea9fe660a9906c50112bae3f6bbb



export default () => {
  const container = document.createElement('div');

  const feed = `
  
  testando 123123
  `;

  container.innerHTML = feed;
  return container;
}