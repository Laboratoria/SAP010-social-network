// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

myFunction();

function renderContent(route) {
    const contentElement = document.getElementById('content');
    let content = '';

    if (route === 'home') {
        content = '<h1>Welcome to the Home page!</h1>';
    } else if (route === 'about') {
        content = '<h1>About Us</h1><p>This is the about page.</p>';
    }else{
        content = '<h1>Page not found</h1>';
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