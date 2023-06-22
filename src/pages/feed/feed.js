import './feed.css';

import { getUserName, getAppAuth } from '../../configFirebase/auth';


export default () => {
  const container = document.createElement('div');

  const template = `
  
  testando 123123
  `;

  container.innerHTML = template;
  return container;
};
