export default () =>{
    const containerFeed = document.createElement("section");
    const templateFeed = `
    <h1> Olá </h1>
    `
    containerFeed.innerHTML = templateFeed;
    return containerFeed;
}