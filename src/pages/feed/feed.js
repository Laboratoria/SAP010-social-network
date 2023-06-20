import './feed.css';
import { getUserName, getAppAuth } from '../../configFirebase/auth';



export default () => {
  const container = document.createElement('div');

  const feed = `
  
  testando 123123
  `;

  container.innerHTML = feed;
  return container;
}