export default () => {
    const container = document.createElement('div');
    container.id = 'cssfeed';

    const template = `Feed`

    container.innerHTML = template;

    return container;
}