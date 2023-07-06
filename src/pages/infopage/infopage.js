import './infopage.css';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';
import githubicon from '../imagens/CBDCNNCT-IMG/icones/githubicon.png';
import linkedin from '../imagens/CBDCNNCT-IMG/icones/linkedin.png';

export default ()=> {
    const containerInfopage = document.createElement('section');
    containerInfopage.classList.add('container-login');

    const templateInfopage = `
    <p class = "container-text texto"> terceiro projeto desenvolvido para o Bootcamp Laboratoria - Turma SAP010 com o objetivo de por em
     prática e aferir as habilidades das alunas: <br>
     Camila Gonçalves ${githubicon} ${linkedin}<br>
     Diulianne Oliveira ${githubicon} ${linkedin}<br>
     Marianna Esteves  ${githubicon} ${linkedin}<br>
     <br>
     Entre em contato conosco nas redes sociais acima. 
     <br>
     Para mais informações sobre o tema:<br>
     - <a href="https://www.msdmanuals.com/pt-br/casa/assuntos-especiais/suplementos-alimentares-e-vitaminas/canabidiol-cbd">Manual de Saúde para Família MSD</a> <br>
     - <a href="https://abraceesperanca.org.br"> Associação Brasileira de Apoio Cannabis Esperança </a>
     - <a href ="https://www.gov.br/pt-br/servicos/solicitar-autorizacao-para-importacao-excepcional-de-produtos-a-base-de-canabidiol"> Manual de importação ANVISA (Governo Brasileiro)</a>
     <img class="img-CBD1" src=${CBD} alt="logo app"> </p>
     `
     containerInfopage.innerHTML = templateInfopage;
     return containerInfopage;
    
    }
   