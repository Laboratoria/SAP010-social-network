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
        <div class="container">
            <h1 class="welcome">Bem-vindo(a) ao <br/>&lt;GAMEE&gt;!</h1>
            <nav>    
                <a href="#login" class="color-welcome"><div class="btn signIn">Entrar</div></a>  
            </nav>
            <p>ou</p>
            <nav>
                <a href="#register" class="letter-color"><div class="btn">Cadastrar</div></a>
            </nav>
        </div>
    `;

    container.innerHTML = template;

    return container;

}//endExportArrowFunction