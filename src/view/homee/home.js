export default () => {

    const container = document.createElement('section');

    const template = `
        <div id="container-image-welcome">
            <img src="assets/images/menina-home.gif" alt="menina usando desktop">
        </div>
        <div>
            <h1>Bem-vindo(a) ao &lt;GAMEE&gt;!</h1>
            <nav>
                <a href="#login">Entrar</a>
            </nav>
            <p>ou</p>
            <nav>
                <a href="#register">Cadastrar</a>
            </nav>
        </div>
    `;

    container.innerHTML = template;

    return container;

}//endExportArrowFunction