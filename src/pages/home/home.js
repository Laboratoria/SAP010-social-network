import meninahome from '../../imagens/menina.png';

export default () => {
  const container = document.createElement('div');
  container.id = 'csshome';

  const template = `
    <picture id="picture-home">
    <img src="${meninahome}" alt="menina fazendo movimento de arte marcial" id="menina-home">
    </picture>
    <article>
    <h1>Bem-vinda ao Fight Back!</h1>
    <p>Um espaço pensado para mulheres com espírito
     de lutadoras e sobreviventes. Compartilhe ideias e técnicas de
      autodefesa, ajude pessoas em vulnerabilidade a se defenderem e
       alimente seu conhecimento em defesa pessoal.</p>
    <div class="botoes">
    <button id="btn-cinza-home"><a href="/#login">Entrar</a></button>
    <button id="btn-branco"><a href="/#cadastro">Cadastrar</a></button>
    </div>
    </article>`;

  container.innerHTML = template;

  return container;
};
