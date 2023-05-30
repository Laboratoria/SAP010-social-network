import './home.css'
import meninaHome from '../../images/menina-home.gif'

export default () => {

    const container = document.createElement('section');
    container.classList.add("container-main");
    container.classList.add("letter-color");

    const template = `
        <div class="container-image-welcome">
            <img src=${meninaHome} alt="menina usando desktop">
        </div>
        <div class="container space-between">
            <h1 class="welcome">Bem-vindo(a) ao <br/>&lt;GAMEE&gt;!</h1>
            <nav class="btn signIn">
                <a href="#login" class="color-welcome">Entrar</a>
            </nav>
            <p>ou</p>
            <nav class="btn">
                <a href="#register" class="letter-color">Cadastrar</a>
            </nav>
        </div>
    `;

    container.innerHTML = template;

    return container;

}//endExportArrowFunction