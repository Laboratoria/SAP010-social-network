// Este es el punto de entrada de tu aplicacion

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { myFunction } from './lib/index.js';

const contentElement = document.getElementById('content');
let content = '';

myFunction();

function renderContent(route) {
  if (route === 'home') {
    content = '<h1>Welcome to the Home page!</h1>';
  } else if (route === 'about') {
    content = '<h1>About Us</h1><p>This is the about page.</p>';
  } else {
    console.log('entrou no else do renderContent');
  }
  contentElement.innerHTML = content;
}

function handleRouteChange() {
  const route = window.location.hash.slice(1);
  renderContent(route);
}

// Add event listener to handle hash change
window.addEventListener('hashchange', handleRouteChange);

// Initial page load
handleRouteChange();

const firebaseConfig = {
  apiKey: 'AIzaSyA5-EC7w2kyAubzcvG9-lS0grc_S9myUuA',
  authDomain: 'papo-privado.firebaseapp.com',
  projectId: 'papo-privado',
  storageBucket: 'papo-privado.appspot.com',
  messagingSenderId: '828549193141',
  appId: '1:828549193141:web:9fc053a22f83d370154dfc',
  measurementId: 'G-F4G0BBHMK0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
