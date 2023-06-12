import template from './feed.html?raw';  

const main = async () => {
    const root = document.querySelector('#root');
    root.innerHTML = template;
}

export default main;
