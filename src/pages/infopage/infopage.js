import './infopage.css';
import CBD from '../imagens/CBDCNNCT-IMG/logodesktopsemsombra.png';

import githubicon from '../imagens/icones/githubicon.png';
import linkedin from '../imagens/icones/linkedin.png';
import voltar from '../imagens/icones/voltar.png';

export default () => {
  const containerInfopage = document.createElement('section');
  containerInfopage.classList.add('container-infopage');

  const templateInfopage = `
    <a href="#feed" class="img-voltar" id="iconeVoltar"><img src=${voltar} alt="icone voltar" title="Ícone para Voltar"></a>
   
     
     <section class="info-devs">
     <p class="texto2"> Terceiro projeto desenvolvido para o Bootcamp Laboratoria - Turma SAP010 com o objetivo de por em
     prática e aferir as habilidades das alunas: </p> <br>
     <p class="texto2">Camila Gonçalves:
     <a href="https://github.com/CamilaVerso/" target="_blank">
     <figure>
     <img id="githubCamila" class="linkedin" src=${githubicon} alt="logo para o perfil do GitHub da desenvolvedora Camila Gonçalves" title="GitHub Camila Gonçalves">
     </figure>
     </a>
     <a href="https://www.linkedin.com/in/camilanpgoncalves/" target="_blank">
     <figure>
     <img id="linkedinCamila" class="linkedin" src=${linkedin} alt="logo para o perfil do Linkedin da desenvolvedora Camila Gonçalves" title="Linkedin Camila Gonçalves">
     </figure>
     </a>
     </p>
    <br>

    <p class="texto2">Diulianne Oliveira: 
     <a href="https://github.com/Diulianne/" target="_blank">
     <figure>
     <img id="githubDiulianne" class="linkedin" src=${githubicon} alt="logo para o perfil do GitHub da desenvolvedora Diulianne" title="GitHub Diulianne">
     </figure>
     </a>
     <a href="https://www.linkedin.com/in/diulianneoliveira/" target="_blank">
     <figure>
     <img id="linkedinDiulianne" class="linkedin" src=${linkedin} alt="logo para o perfil do Linkedin da desenvolvedora Diulianne" title="Linkedin Diulianne">
     </figure>
     </a>
     </p>
    <br>

    <p class="texto2">Marianna Esteves: 
     <a href="https://github.com/maristvs" target="_blank">
     <figure>
     <img id="githubMariannaEsteves" class="linkedin" src=${githubicon} alt="logo para o perfil do GitHub da desenvolvedora Marianna Esteves" title="GitHub Marianna Esteves">
     </figure>
     </a>
     <a href="https://www.linkedin.com/in/marianna-esteves-43bb6a274/" target="_blank">
     <figure>
     <img id="linkedinMariannaEsteves" class="linkedin" src=${linkedin} alt="logo para o perfil do Linkedin da desenvolvedora Marianna Esteves" title="Linkedin Marianna Esteves">
     </figure>
     </a>
     </p>
    <br>
    </section>
    
     <p class="texto2"> Entre em contato conosco nas redes sociais acima. </p>
     <br>
     <p class="texto2">Para mais informações sobre o tema:</p> <br>
     <a href="https://www.msdmanuals.com/pt-br/casa/assuntos-especiais/suplementos-alimentares-e-vitaminas/canabidiol-cbd" target="_blank">Manual de Saúde para Família MSD</a> <br>
     <a href="https://abraceesperanca.org.br" target="_blank"> Associação Brasileira de Apoio Cannabis Esperança </a><br>
     <a href ="https://www.gov.br/pt-br/servicos/solicitar-autorizacao-para-importacao-excepcional-de-produtos-a-base-de-canabidiol" target="_blank"> Manual de importação ANVISA (Governo Brasileiro)</a>
     <img class="img-CBD1" src=${CBD} alt="logo app"> `;

  containerInfopage.innerHTML = templateInfopage;

  return containerInfopage;
};
